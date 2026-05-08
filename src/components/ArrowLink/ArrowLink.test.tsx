import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ArrowLink from "./ArrowLink";

describe("ArrowLink", () => {
  it("renders link with text and arrow", () => {
    render(<ArrowLink text="Click me" href="/test" />);
    expect(screen.getByText(/Click me →/)).toBeInTheDocument();
  });

  it("uses correct href", () => {
    render(<ArrowLink text="Test" href="/test-path" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-path");
  });

  it("applies link class", () => {
    const { container } = render(<ArrowLink text="Test" href="/test" />);
    const link = container.querySelector("a");
    expect(link?.className).toContain("link");
  });
});
