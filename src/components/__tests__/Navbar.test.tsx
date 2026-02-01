import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Navbar from "../Navbar/Navbar";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Couples Retreat")).toBeInTheDocument();
    expect(screen.getByText("Partner Search")).toBeInTheDocument();
    expect(screen.getByText("Inquire")).toBeInTheDocument();
  });

  it("displays site logo", () => {
    render(<Navbar />);
    // Check for logo text ": V ." which is the logoMark
    const logo = screen.getByText(/: V \./);
    expect(logo).toBeInTheDocument();
  });
});
