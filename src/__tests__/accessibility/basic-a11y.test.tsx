/**
 * Basic Accessibility Tests
 *
 * These tests check fundamental accessibility requirements.
 * For comprehensive WCAG compliance, install jest-axe and run:
 * npm install --save-dev jest-axe
 *
 * Then uncomment the axe tests in this file.
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
// import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Footer from '@/components/Footer/Footer';

// expect.extend(toHaveNoViolations);

describe('Basic Accessibility', () => {
  describe('Navbar', () => {
    it('has navigation landmark', () => {
      render(<Navbar />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('hamburger menu has accessible label', () => {
      render(<Navbar />);
      const button = screen.getByRole('button', { name: /open menu/i });
      expect(button).toBeInTheDocument();
    });

    it('mobile menu has aria-expanded attribute', () => {
      render(<Navbar />);
      const button = screen.getByRole('button', { name: /open menu/i });
      expect(button).toHaveAttribute('aria-expanded');
    });

    it('all navigation links are accessible', () => {
      render(<Navbar />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        // Each link should have accessible text
        expect(link.textContent).toBeTruthy();
      });
    });

    // Uncomment when jest-axe is installed:
    // it('has no axe violations', async () => {
    //   const { container } = render(<Navbar />);
    //   const results = await axe(container);
    //   expect(results).toHaveNoViolations();
    // });
  });

  describe('Hero', () => {
    it('renders heading with proper hierarchy', () => {
      render(
        <Hero
          headline="Test Headline"
          subtitleLines={['Subtitle 1', 'Subtitle 2']}
        />
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Headline');
    });

    it('image has alt text when provided', () => {
      render(
        <Hero
          headline="Test"
          subtitleLines={['Test']}
          imageSrc="/test.jpg"
          imageAlt="Test image"
        />
      );

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Test image');
    });

    it('CTA link is accessible when provided', () => {
      render(
        <Hero
          headline="Test"
          subtitleLines={['Test']}
          ctaText="Click me"
          ctaHref="/test"
        />
      );

      const link = screen.getByRole('link', { name: /click me/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    // Uncomment when jest-axe is installed:
    // it('has no axe violations', async () => {
    //   const { container } = render(
    //     <Hero headline="Test" subtitleLines={['Test']} />
    //   );
    //   const results = await axe(container);
    //   expect(results).toHaveNoViolations();
    // });
  });

  describe('Footer', () => {
    it('has contentinfo landmark', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('phone link uses tel: protocol', () => {
      render(<Footer />);
      const phoneLink = screen.getByRole('link', { name: /\d{3}.*\d{3}.*\d{4}/ });
      expect(phoneLink).toHaveAttribute('href');
      expect(phoneLink.getAttribute('href')).toMatch(/^tel:/);
    });

    it('all footer links are accessible', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link.textContent).toBeTruthy();
        expect(link).toHaveAttribute('href');
      });
    });

    // Uncomment when jest-axe is installed:
    // it('has no axe violations', async () => {
    //   const { container } = render(<Footer />);
    //   const results = await axe(container);
    //   expect(results).toHaveNoViolations();
    // });
  });

  describe('Interactive Elements', () => {
    it('buttons have accessible names', () => {
      render(<Navbar />);
      const button = screen.getByRole('button');

      // Button should have accessible text via aria-label or text content
      const accessibleName = button.getAttribute('aria-label') || button.textContent;
      expect(accessibleName).toBeTruthy();
    });
  });

  describe('Semantic HTML', () => {
    it('uses proper heading hierarchy in navbar', () => {
      render(<Navbar />);

      // Navbar should not have h1 (that's for page content)
      const headings = screen.queryAllByRole('heading');
      const h1s = headings.filter(h => h.tagName === 'H1');

      expect(h1s.length).toBe(0);
    });
  });
});
