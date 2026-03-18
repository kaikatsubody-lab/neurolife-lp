import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Function: /api/trpc/*
 * tRPC互換のAPIエンドポイント
 * 
 * フロントエンドのtRPCクライアントからのリクエストを処理する
 * Vercel環境ではtRPCの完全なセットアップの代わりに、
 * 必要なエンドポイントのみをシンプルに実装する
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Extract the tRPC procedure path
  const { trpc } = req.query;
  const procedurePath = Array.isArray(trpc) ? trpc.join(".") : trpc;

  // Handle batch requests (tRPC sends batched requests)
  // URL format: /api/trpc/lead.submit?batch=1
  // Body format: {"0": {"json": {"name": "...", "phone": "..."}}}

  try {
    if (procedurePath === "lead.submit") {
      return await handleLeadSubmit(req, res);
    }

    if (procedurePath === "auth.me") {
      // Auth is not available on Vercel - return null user
      return res.status(200).json([{
        result: {
          data: {
            json: null,
          },
        },
      }]);
    }

    // Unknown procedure
    return res.status(404).json([{
      error: {
        message: `Procedure "${procedurePath}" not found`,
        code: -32004,
        data: { code: "NOT_FOUND" },
      },
    }]);
  } catch (error) {
    console.error("[tRPC] Error:", error);
    return res.status(500).json([{
      error: {
        message: "Internal server error",
        code: -32603,
        data: { code: "INTERNAL_SERVER_ERROR" },
      },
    }]);
  }
}

async function handleLeadSubmit(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json([{
      error: {
        message: "Method not allowed",
        code: -32005,
        data: { code: "METHOD_NOT_SUPPORTED" },
      },
    }]);
  }

  try {
    // tRPC batch format: {"0": {"json": {"name": "...", "phone": "..."}}}
    const body = req.body;
    let input: { name: string; phone: string };

    if (body && body["0"] && body["0"].json) {
      // Batch request format
      input = body["0"].json;
    } else if (body && body.json) {
      // Single request format
      input = body.json;
    } else if (body && body.name) {
      // Direct format
      input = body;
    } else {
      return res.status(400).json([{
        error: {
          message: "Invalid request body",
          code: -32600,
          data: { code: "BAD_REQUEST" },
        },
      }]);
    }

    const { name, phone } = input;

    if (!name || !phone) {
      return res.status(400).json([{
        error: {
          message: "名前と電話番号は必須です",
          code: -32600,
          data: { code: "BAD_REQUEST" },
        },
      }]);
    }

    // Google Sheets連携（GAS Web App Webhook）
    const sheetsWebhookUrl = process.env.GAS_WEBAPP_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.warn("[Lead] Google Sheets webhook failed:", e);
      }
    }

    // Return tRPC-compatible response
    return res.status(200).json([{
      result: {
        data: {
          json: { success: true },
        },
      },
    }]);
  } catch (error) {
    console.error("[Lead Submit] Error:", error);
    return res.status(500).json([{
      error: {
        message: "Internal server error",
        code: -32603,
        data: { code: "INTERNAL_SERVER_ERROR" },
      },
    }]);
  }
}
