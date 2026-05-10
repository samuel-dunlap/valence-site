import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Accordion from "./Accordion";

describe("Accordion", () => {
  const mockItems = [
    { title: "Section 1", children: <p>Content 1</p> },
    { title: "Section 2", children: <p>Content 2</p> },
  ];

  it("renders all section titles", () => {
    render(<Accordion items={mockItems} />);
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("all sections closed by default", () => {
    render(<Accordion items={mockItems} />);
    const button1 = screen.getByText("Section 1").closest("button");
    expect(button1).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles section when clicked", () => {
    render(<Accordion items={mockItems} />);
    const button2 = screen.getByText("Section 2").closest("button");

    expect(button2).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(button2!);
    expect(button2).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(button2!);
    expect(button2).toHaveAttribute("aria-expanded", "false");
  });

  it("renders correct number of items", () => {
    const { container } = render(<Accordion items={mockItems} />);
    const items = container.querySelectorAll('[class*="item"]');
    expect(items.length).toBe(2);
  });
});
