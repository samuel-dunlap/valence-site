import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage, { metadata } from "./page";

describe("HomePage", () => {
  it("renders hero section with headline", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/psychotherapy.*couples therapy/i);
  });

  it("renders subtitle lines", () => {
    render(<HomePage />);
    expect(screen.getByText(/upper east side, manhattan/i)).toBeInTheDocument();
  });

  it("renders welcome section", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /welcome/i })
    ).toBeInTheDocument();
  });

  it("renders CTA link to inquire", () => {
    render(<HomePage />);

    const ctaLinks = screen.getAllByRole("link", {
      name: /request an introduction/i,
    });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute("href", "/inquire");
  });

  describe("Metadata", () => {
    it("has title and description", () => {
      expect(metadata.title).toBeTruthy();
      expect(metadata.description).toBeTruthy();
      expect(typeof metadata.title).toBe("object");
      expect(typeof metadata.description).toBe("string");
    });

    it("has canonical URL", () => {
      expect(metadata.alternates?.canonical).toBeTruthy();
      expect(metadata.alternates?.canonical).toBe("/");
    });

    it("title contains Upper East Side Therapy", () => {
      const title = (metadata.title as { absolute: string }).absolute;
      expect(title).toMatch(/upper east side therapy/i);
    });

    it("description is a reasonable length", () => {
      const desc = metadata.description as string;
      expect(desc.length).toBeGreaterThan(50);
      expect(desc.length).toBeLessThan(300);
    });
  });
});
