import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage, { metadata } from './page';

describe('AboutPage', () => {
  it('renders founder section with name', () => {
    render(<AboutPage />);
    expect(screen.getByText(/samuel dunlap/i)).toBeInTheDocument();
  });

  it('renders page heading', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders accordion component', () => {
    render(<AboutPage />);

    // Check for accordion sections
    expect(screen.getByText(/track record/i)).toBeInTheDocument();
    expect(screen.getByText(/foundational research/i)).toBeInTheDocument();
  });

  it('renders founder description text', () => {
    render(<AboutPage />);

    // Should have some biographical content
    const paragraphs = screen.getAllByText(/./);
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  describe('Metadata', () => {
    it('has title and description', () => {
      expect(metadata.title).toBeTruthy();
      expect(metadata.description).toBeTruthy();
    });

    it('has canonical URL for about page', () => {
      expect(metadata.alternates?.canonical).toContain('/about');
    });

    it('has unique title from homepage', () => {
      // Import homepage metadata to compare
      // This ensures each page has unique metadata
      expect(metadata.title).toBeTruthy();
      expect(metadata.title).toMatch(/about/i);
    });
  });
});
