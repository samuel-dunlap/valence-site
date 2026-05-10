import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import IntroOverlay from "./IntroOverlay";

describe("IntroOverlay", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: originalMatchMedia,
    });
  });

  it("shows animation on first visit", () => {
    const { container } = render(<IntroOverlay />);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    const overlay = container.querySelector('[class*="overlay"]');
    expect(overlay).toBeInTheDocument();
  });

  it("skips animation if already seen", () => {
    sessionStorage.setItem("uest-intro-seen", "1");
    const { container } = render(<IntroOverlay />);
    expect(
      container.querySelector('[class*="overlay"]')
    ).not.toBeInTheDocument();
  });

  it("sets sessionStorage flag immediately on animation start", () => {
    render(<IntroOverlay />);
    expect(sessionStorage.getItem("uest-intro-seen")).toBe("1");
  });

  it("skips animation if prefers-reduced-motion", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      })),
    });

    sessionStorage.clear();
    const { container } = render(<IntroOverlay />);
    expect(
      container.querySelector('[class*="overlay"]')
    ).not.toBeInTheDocument();
    expect(sessionStorage.getItem("uest-intro-seen")).toBe("1");
  });

  it("handles sessionStorage errors gracefully", () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

    const { container } = render(<IntroOverlay />);
    expect(container).toBeInTheDocument();

    setItemSpy.mockRestore();
  });

  it("completes animation sequence and removes overlay", async () => {
    const { container } = render(<IntroOverlay />);

    await act(async () => {
      vi.advanceTimersByTime(1);
    });
    expect(container.querySelector('[class*="overlay"]')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1575);
    });
    expect(
      container.querySelector('[class*="overlay"]')
    ).not.toBeInTheDocument();
  });

  it("renders wordmark with correct letters", () => {
    const { container } = render(<IntroOverlay />);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    const wordmark = container.querySelector('[class*="wordmark"]');
    expect(wordmark).toBeInTheDocument();

    expect(wordmark?.textContent).toContain("U");
    expect(wordmark?.textContent).toContain("EST");
  });
});
