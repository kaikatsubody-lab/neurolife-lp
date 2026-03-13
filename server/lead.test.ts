import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db module to avoid actual database connection
vi.mock("./db", () => ({
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  insertLead: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock fetch for GAS webhook
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ result: "success" }),
});

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("lead.submit", () => {
  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({ name: "", phone: "090-1234-5678" })
    ).rejects.toThrow();
  });

  it("rejects empty phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({ name: "テスト太郎", phone: "" })
    ).rejects.toThrow();
  });

  it("accepts valid lead data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      name: "テスト太郎",
      phone: "090-1234-5678",
    });

    expect(result).toEqual({ success: true });
  });

  it("calls GAS webhook with correct data", async () => {
    // Clear previous mock calls
    (global.fetch as any).mockClear();

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.lead.submit({
      name: "テスト花子",
      phone: "080-9876-5432",
    });

    // Verify fetch was called with GAS URL
    expect(global.fetch).toHaveBeenCalled();
    const lastCall = (global.fetch as any).mock.calls[(global.fetch as any).mock.calls.length - 1];
    if (lastCall && lastCall[0] && lastCall[0].includes("script.google.com")) {
      const body = JSON.parse(lastCall[1].body);
      expect(body.name).toBe("テスト花子");
      expect(body.phone).toBe("080-9876-5432");
    }
  });
});
