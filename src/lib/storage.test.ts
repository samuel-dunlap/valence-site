import { describe, it, expect, vi, beforeEach } from "vitest";
import { safeSessionGet, safeSessionSet, safeSessionRemove } from "./storage";

describe("Storage utilities", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe("safeSessionGet", () => {
    it("returns value when key exists", () => {
      sessionStorage.setItem("test", "value");
      expect(safeSessionGet("test")).toBe("value");
    });

    it("returns null when key does not exist", () => {
      expect(safeSessionGet("nonexistent")).toBeNull();
    });

    it("returns null when sessionStorage throws", () => {
      const spy = vi
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      expect(safeSessionGet("test")).toBeNull();
      spy.mockRestore();
    });

    it("returns null in SSR context", () => {
      const originalWindow = global.window;
      // @ts-expect-error - simulating SSR
      delete global.window;

      expect(safeSessionGet("test")).toBeNull();

      global.window = originalWindow;
    });
  });

  describe("safeSessionSet", () => {
    it("sets value successfully", () => {
      const result = safeSessionSet("test", "value");
      expect(result).toBe(true);
      expect(sessionStorage.getItem("test")).toBe("value");
    });

    it("returns false when sessionStorage throws", () => {
      const spy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      const result = safeSessionSet("test", "value");
      expect(result).toBe(false);
      spy.mockRestore();
    });

    it("returns false in SSR context", () => {
      const originalWindow = global.window;
      // @ts-expect-error - simulating SSR
      delete global.window;

      expect(safeSessionSet("test", "value")).toBe(false);

      global.window = originalWindow;
    });
  });

  describe("safeSessionRemove", () => {
    it("removes value successfully", () => {
      sessionStorage.setItem("test", "value");
      safeSessionRemove("test");
      expect(sessionStorage.getItem("test")).toBeNull();
    });

    it("handles errors gracefully", () => {
      const spy = vi
        .spyOn(Storage.prototype, "removeItem")
        .mockImplementation(() => {
          throw new Error("Error");
        });

      expect(() => safeSessionRemove("test")).not.toThrow();
      spy.mockRestore();
    });

    it("handles SSR context gracefully", () => {
      const originalWindow = global.window;
      // @ts-expect-error - simulating SSR
      delete global.window;

      expect(() => safeSessionRemove("test")).not.toThrow();

      global.window = originalWindow;
    });
  });
});
