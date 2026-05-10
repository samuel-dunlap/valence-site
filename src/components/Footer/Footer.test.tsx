import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

vi.mock("@/lib/constants", () => ({
  SITE: {
    phone: "(720) 218-0788",
    copyright: "© 2026 Upper East Side Therapy",
    address: {
      street: "654 Madison Avenue",
      city: "New York",
      state: "NY",
      zip: "10065",
    },
  },
  NAV_LINKS: [
    { href: "/", label: "Home" },
    { href: "/inquire", label: "Inquire" },
  ],
  FOOTER_HREFS: new Set(["/", "/inquire"]),
}));

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2026 Upper East Side Therapy")
    ).toBeInTheDocument();
  });

  it("renders address", () => {
    render(<Footer />);
    expect(screen.getByText(/654 Madison Avenue/)).toBeInTheDocument();
    expect(screen.getByText(/New York, NY 10065/)).toBeInTheDocument();
  });

  it("renders phone link", () => {
    render(<Footer />);
    const phoneLink = screen.getByText("(720) 218-0788").closest("a");
    expect(phoneLink).toHaveAttribute("href", "tel:+17202180788");
  });

  it("renders logo image", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Upper East Side Therapy");
    expect(logo).toBeInTheDocument();
  });

  it("renders only footer navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Inquire")).toBeInTheDocument();
  });

  it("renders navigation links with correct hrefs", () => {
    render(<Footer />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders within footer element", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });
});
