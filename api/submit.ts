import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Function: POST /api/submit
 * フォーム送信専用エンドポイント
 * - Google Sheets（GAS Webhook）に記録
 * - シンプルなJSON API
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, phone } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: "名前と電話番号は必須です" });
    }

    // Google Sheets連携（GAS Web App Webhook）
    const gasUrl = process.env.GAS_WEBAPP_URL;
    if (gasUrl) {
      try {
        const gasRes = await fetch(gasUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            timestamp: new Date().toISOString(),
          }),
        });
        console.log("[Submit] GAS response status:", gasRes.status);
      } catch (e) {
        console.warn("[Submit] Google Sheets webhook failed:", e);
      }
    } else {
      console.warn("[Submit] GAS_WEBAPP_URL is not set");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Submit] Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
