import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage, { metadata } from './page';

describe('HomePage', () => {
  it('renders hero section with headline', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/finding and mastering.*lifelong partnership/i);
  });

  it('renders subtitle lines', () => {
    render(<HomePage />);
    expect(screen.getByText(/relationship advisory for high-net-worth men/i)).toBeInTheDocument();
    expect(screen.getByText(/nyc \+ aspen/i)).toBeInTheDocument();
  });

  it('renders both service cards', () => {
    render(<HomePage />);

    // Find service card links
    const couplesLink = screen.getByRole('link', { name: /couples retreat/i });
    const partnerLink = screen.getByRole('link', { name: /partner search/i });

    expect(couplesLink).toBeInTheDocument();
    expect(partnerLink).toBeInTheDocument();
  });

  it('service cards have correct hrefs', () => {
    render(<HomePage />);

    const couplesLink = screen.getByRole('link', { name: /couples retreat/i });
    const partnerLink = screen.getByRole('link', { name: /partner search/i });

    expect(couplesLink).toHaveAttribute('href', '/couples-retreat');
    expect(partnerLink).toHaveAttribute('href', '/partner-search');
  });

  it('renders service card descriptions', () => {
    render(<HomePage />);

    expect(screen.getByText(/luxury hospitality, wellness, and structured relational work/i)).toBeInTheDocument();
    expect(screen.getByText(/psychologically curated matchmaking/i)).toBeInTheDocument();
  });

  describe('Metadata', () => {
    it('has title and description', () => {
      expect(metadata.title).toBeTruthy();
      expect(metadata.description).toBeTruthy();
      expect(typeof metadata.title).toBe('string');
      expect(typeof metadata.description).toBe('string');
    });

    it('has canonical URL', () => {
      expect(metadata.alternates?.canonical).toBeTruthy();
      expect(metadata.alternates?.canonical).toBe('/');
    });

    it('title contains Valence', () => {
      expect(metadata.title).toMatch(/valence/i);
    });

    it('description is not too long', () => {
      // Meta descriptions should be 50-160 characters
      const desc = metadata.description as string;
      expect(desc.length).toBeGreaterThan(50);
      expect(desc.length).toBeLessThan(160);
    });
  });
});
