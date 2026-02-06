import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FadeIn from "./FadeIn";

describe("FadeIn", () => {
  it("renders children", () => {
    const { getByText } = render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("initially renders without visible class", () => {
    const { container } = render(
      <FadeIn>
        <div>Content</div>
      </FadeIn>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(/wrapper/);
    expect(wrapper).not.toHaveClass(/visible/);
  });

  it("applies wrapper class", () => {
    const { container } = render(
      <FadeIn>
        <div>Content</div>
      </FadeIn>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("wrapper");
  });

  it("disconnects observer after becoming visible", () => {
    const disconnectSpy = vi.fn();
    const observeSpy = vi.fn();

    global.IntersectionObserver = vi.fn().mockImplementation((_callback) => ({
      observe: observeSpy,
      disconnect: disconnectSpy,
      unobserve: vi.fn(),
    }));

    const { unmount } = render(
      <FadeIn>
        <div>Content</div>
      </FadeIn>
    );

    expect(observeSpy).toHaveBeenCalled();

    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
