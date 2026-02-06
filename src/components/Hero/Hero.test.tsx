import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  const mockProps = {
    headline: <>Test Headline</>,
    subtitleLines: ["Line 1", "Line 2", "Line 3"],
  };

  it("renders headline", () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText("Test Headline")).toBeInTheDocument();
  });

  it("renders all subtitle lines", () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();
  });

  it("renders CTA when provided", () => {
    render(<Hero {...mockProps} ctaText="Click Me" ctaHref="/test" />);
    expect(screen.getByText(/Click Me/)).toBeInTheDocument();
  });

  it("does not render CTA when not provided", () => {
    const { container } = render(<Hero {...mockProps} />);
    expect(container.querySelector('a[href="/test"]')).not.toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(
      <Hero {...mockProps} imageSrc="/test.jpg" imageAlt="Test Image" />
    );
    expect(screen.getByAltText("Test Image")).toBeInTheDocument();
  });

  it("uses splitContainer class with image", () => {
    const { container } = render(
      <Hero {...mockProps} imageSrc="/test.jpg" imageAlt="Test" />
    );
    expect(container.querySelector('[class*="splitContainer"]')).toBeInTheDocument();
  });

  it("uses regular container class without image", () => {
    const { container } = render(<Hero {...mockProps} />);
    expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="splitContainer"]')).not.toBeInTheDocument();
  });

  it("uses default alt text when imageAlt not provided", () => {
    render(<Hero {...mockProps} imageSrc="/test.jpg" />);
    expect(screen.getByAltText("Decorative image")).toBeInTheDocument();
  });
});
