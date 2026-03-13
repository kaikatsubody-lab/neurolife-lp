import { describe, expect, it } from "vitest";

describe("GAS Webhook URL", () => {
  it("GAS_WEBAPP_URL environment variable is set and is a valid URL", () => {
    const url = process.env.GAS_WEBAPP_URL;
    expect(url).toBeDefined();
    expect(url).not.toBe("");
    expect(url).toMatch(/^https:\/\/script\.google\.com\/macros\/s\//);
  });
});
