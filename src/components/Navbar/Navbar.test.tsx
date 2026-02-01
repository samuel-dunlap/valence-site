import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  it('renders logo and navigation links', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('Valence Home')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger clicked', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-hidden', 'false');
  });

  it('closes mobile menu when close button clicked', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);

    const closeBtn = screen.getByLabelText('Close menu');
    fireEvent.click(closeBtn);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
  });

  it('has proper aria-label on mobile menu dialog', () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Mobile navigation menu');
  });
});
