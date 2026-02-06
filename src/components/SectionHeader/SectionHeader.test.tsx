import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders title", () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders title as h2", () => {
    render(<SectionHeader title="Test Title" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Title");
  });

  it("renders horizontal rule", () => {
    const { container } = render(<SectionHeader title="Test" />);
    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  it("has correct structure", () => {
    const { container } = render(<SectionHeader title="Test" />);
    const wrapper = container.firstChild;
    expect(wrapper?.childNodes).toHaveLength(2); // hr and h2
  });
});
