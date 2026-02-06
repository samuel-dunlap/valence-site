import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

// Mock the constants module
vi.mock("@/lib/constants", () => ({
  SITE: {
    phone: "(212) 263-0000",
    copyright: "© 2026 Valence Relationship Advisory",
    address: {
      street: "654 Madison Avenue",
      city: "New York",
      state: "NY",
      zip: "10065",
    },
  },
  NAV_LINKS: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/couples-retreat", label: "Couples Retreat" },
    { href: "/partner-search", label: "Partner Search" },
    { href: "/inquire", label: "Inquire" },
  ],
  FOOTER_HREFS: new Set(["/", "/about", "/inquire"]),
}));

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2026 Valence Relationship Advisory")
    ).toBeInTheDocument();
  });

  it("renders address", () => {
    render(<Footer />);
    expect(screen.getByText(/654 Madison Avenue/)).toBeInTheDocument();
    expect(screen.getByText(/New York, NY 10065/)).toBeInTheDocument();
  });

  it("renders phone link", () => {
    render(<Footer />);
    const phoneLink = screen.getByText("(212) 263-0000").closest("a");
    expect(phoneLink).toHaveAttribute("href", "tel:+12122630000");
  });

  it("renders logo image", () => {
    render(<Footer />);
    const logo = screen.getByAltText("Valence");
    expect(logo).toBeInTheDocument();
  });

  it("renders only footer navigation links", () => {
    render(<Footer />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Inquire")).toBeInTheDocument();
    expect(screen.queryByText("Couples Retreat")).not.toBeInTheDocument();
    expect(screen.queryByText("Partner Search")).not.toBeInTheDocument();
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
