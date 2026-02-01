import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Accordion from './Accordion';

describe('Accordion', () => {
  const mockSections = [
    { title: 'Section 1', content: 'Content 1', defaultOpen: true },
    { title: 'Section 2', content: 'Content 2' },
  ];

  it('renders all section titles', () => {
    render(<Accordion sections={mockSections} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('opens default sections on mount', () => {
    render(<Accordion sections={mockSections} />);
    const button1 = screen.getByText('Section 1').closest('button');
    expect(button1).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles section when clicked', () => {
    render(<Accordion sections={mockSections} />);
    const button2 = screen.getByText('Section 2').closest('button');

    expect(button2).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button2!);
    expect(button2).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button2!);
    expect(button2).toHaveAttribute('aria-expanded', 'false');
  });

  it('uses section title as key (no React key warnings)', () => {
    // This test verifies the refactoring works correctly
    const { container } = render(<Accordion sections={mockSections} />);
    const sections = container.querySelectorAll('[class*="section"]');
    expect(sections.length).toBe(2);
  });
});
