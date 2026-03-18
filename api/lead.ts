import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Function: /api/lead
 * フォーム送信を処理し、Google Sheetsに保存してからLINEリダイレクト用のレスポンスを返す
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
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "名前と電話番号は必須です" });
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Lead] Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
