import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { insertLead } from "./db";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  lead: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "お名前を入力してください"),
          phone: z.string().min(1, "電話番号を入力してください"),
        })
      )
      .mutation(async ({ input }) => {
        // Save to database
        await insertLead(input.name, input.phone);

        // Send notification to owner
        try {
          await notifyOwner({
            title: "新規リード登録",
            content: `お名前: ${input.name}\n電話番号: ${input.phone}\n登録日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
          });
        } catch (e) {
          console.warn("[Lead] Notification failed:", e);
        }

        // Also attempt to send to Google Sheets via Apps Script webhook
        const sheetsWebhookUrl = process.env.GAS_WEBAPP_URL;
        if (sheetsWebhookUrl) {
          try {
            await fetch(sheetsWebhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: input.name,
                phone: input.phone,
                timestamp: new Date().toISOString(),
              }),
            });
          } catch (e) {
            console.warn("[Lead] Google Sheets webhook failed:", e);
          }
        }

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
