import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ComparisonColumns from "./ComparisonColumns";

describe("ComparisonColumns", () => {
  const mockProps = {
    leftTitle: "Left Title",
    leftItems: ["Left 1", "Left 2"],
    rightTitle: "Right Title",
    rightItems: ["Right 1", "Right 2", "Right 3"],
  };

  it("renders both column titles", () => {
    render(<ComparisonColumns {...mockProps} />);
    expect(screen.getByText("Left Title")).toBeInTheDocument();
    expect(screen.getByText("Right Title")).toBeInTheDocument();
  });

  it("renders all left items", () => {
    render(<ComparisonColumns {...mockProps} />);
    expect(screen.getByText("Left 1")).toBeInTheDocument();
    expect(screen.getByText("Left 2")).toBeInTheDocument();
  });

  it("renders all right items", () => {
    render(<ComparisonColumns {...mockProps} />);
    expect(screen.getByText("Right 1")).toBeInTheDocument();
    expect(screen.getByText("Right 2")).toBeInTheDocument();
    expect(screen.getByText("Right 3")).toBeInTheDocument();
  });

  it("handles empty item arrays", () => {
    const { container } = render(
      <ComparisonColumns
        leftTitle="Empty Left"
        leftItems={[]}
        rightTitle="Empty Right"
        rightItems={[]}
      />
    );
    const lists = container.querySelectorAll("ul");
    expect(lists).toHaveLength(2);
    expect(lists[0].children).toHaveLength(0);
    expect(lists[1].children).toHaveLength(0);
  });

  it("renders within navySection", () => {
    const { container } = render(<ComparisonColumns {...mockProps} />);
    expect(container.querySelector(".navySection")).toBeInTheDocument();
  });
});
