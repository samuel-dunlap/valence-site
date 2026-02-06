import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServiceCard from "./ServiceCard";

describe("ServiceCard", () => {
  const mockProps = {
    title: "Test Service",
    tagline: "Test Tagline",
    description: "Test Description",
    href: "/test-service",
  };

  it("renders title", () => {
    render(<ServiceCard {...mockProps} />);
    expect(screen.getByText("Test Service")).toBeInTheDocument();
  });

  it("renders tagline", () => {
    render(<ServiceCard {...mockProps} />);
    expect(screen.getByText("Test Tagline")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<ServiceCard {...mockProps} />);
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders as link with correct href", () => {
    render(<ServiceCard {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test-service");
  });

  it("renders default CTA text", () => {
    render(<ServiceCard {...mockProps} />);
    expect(screen.getByText(/Learn more →/)).toBeInTheDocument();
  });

  it("renders custom CTA text", () => {
    render(<ServiceCard {...mockProps} ctaText="Read more" />);
    expect(screen.getByText(/Read more →/)).toBeInTheDocument();
  });

  it("renders title as h2", () => {
    render(<ServiceCard {...mockProps} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Service");
  });
});
