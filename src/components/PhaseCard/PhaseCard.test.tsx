import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PhaseCard from "./PhaseCard";

describe("PhaseCard", () => {
  const mockProps = {
    phaseNumber: 1,
    title: "Test Phase",
    description: "This is a test description",
  };

  it("renders phase number", () => {
    render(<PhaseCard {...mockProps} />);
    expect(screen.getByText("phase 1:")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<PhaseCard {...mockProps} />);
    expect(screen.getByText("Test Phase")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<PhaseCard {...mockProps} />);
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("renders title as h3", () => {
    render(<PhaseCard {...mockProps} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Test Phase");
  });

  it("handles different phase numbers", () => {
    render(<PhaseCard {...mockProps} phaseNumber={5} />);
    expect(screen.getByText("phase 5:")).toBeInTheDocument();
  });
});
