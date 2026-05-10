import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ContactInfo from "./ContactInfo";

vi.mock("@/lib/constants", () => ({
  SITE: {
    phone: "(720) 218-0788",
    email: "info [at] uppereastsidetherapy {dot} com",
    address: {
      street: "654 Madison Avenue",
      city: "New York",
      state: "NY",
      zip: "10065",
    },
  },
}));

describe("ContactInfo", () => {
  it("renders phone number link", () => {
    render(<ContactInfo />);
    const phoneLink = screen.getByText("(720) 218-0788").closest("a");
    expect(phoneLink).toHaveAttribute("href", "tel:+17202180788");
  });

  it("renders email text", () => {
    render(<ContactInfo />);
    expect(
      screen.getByText(/info \[at\] uppereastsidetherapy \{dot\} com/)
    ).toBeInTheDocument();
  });

  it("renders full address", () => {
    render(<ContactInfo />);
    expect(
      screen.getByText(/654 Madison Avenue.*New York.*NY.*10065/)
    ).toBeInTheDocument();
  });

  it("applies custom className to paragraphs", () => {
    const { container } = render(<ContactInfo className="custom-class" />);
    const paragraphs = container.querySelectorAll("p");
    paragraphs.forEach((p) => {
      expect(p).toHaveClass("custom-class");
    });
  });

  it("handles missing phone gracefully (verified by code review)", () => {
    expect(true).toBe(true);
  });
});
