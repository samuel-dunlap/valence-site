import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle, formatPhoneForLink, isValidPhone, generateListKey } from './utils';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls function immediately on first invocation', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('arg1', 'arg2');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('prevents subsequent calls within delay period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows call after delay period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(99);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1); // Still throttled

    vi.advanceTimersByTime(1);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2); // Now allowed
  });

  it('calls with most recent arguments after delay', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('first');
    throttled('second');
    throttled('third');

    expect(fn).toHaveBeenCalledWith('first');

    vi.advanceTimersByTime(100);

    // The trailing edge should have called with the most recent args
    expect(fn).toHaveBeenCalledWith('third');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('formatPhoneForLink', () => {
  it('formats standard US phone number with parentheses', () => {
    expect(formatPhoneForLink('(555) 123-4567')).toBe('+15551234567');
  });

  it('formats phone number with dashes', () => {
    expect(formatPhoneForLink('555-123-4567')).toBe('+15551234567');
  });

  it('formats phone number with dots', () => {
    expect(formatPhoneForLink('555.123.4567')).toBe('+15551234567');
  });

  it('formats phone number with spaces', () => {
    expect(formatPhoneForLink('555 123 4567')).toBe('+15551234567');
  });

  it('handles already formatted number with +1', () => {
    expect(formatPhoneForLink('+15551234567')).toBe('+15551234567');
  });

  it('removes all non-digit characters', () => {
    expect(formatPhoneForLink('(555) 123-4567 ext. 890')).toBe('+15551234567890');
  });

  it('adds country code if missing', () => {
    expect(formatPhoneForLink('5551234567')).toBe('+15551234567');
  });

  it('handles 11-digit number starting with 1', () => {
    expect(formatPhoneForLink('15551234567')).toBe('+15551234567');
  });
});

describe('isValidPhone', () => {
  it('validates 10-digit US phone number', () => {
    expect(isValidPhone('5551234567')).toBe(true);
  });

  it('validates 11-digit number with country code', () => {
    expect(isValidPhone('15551234567')).toBe(true);
  });

  it('rejects 9-digit number', () => {
    expect(isValidPhone('555123456')).toBe(false);
  });

  it('rejects 12-digit number', () => {
    expect(isValidPhone('155512345678')).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidPhone('')).toBe(false);
  });

  it('rejects non-numeric string', () => {
    expect(isValidPhone('abcdefghij')).toBe(false);
  });

  it('rejects string with letters and numbers', () => {
    expect(isValidPhone('555abc4567')).toBe(false);
  });

  it('accepts string with only digits', () => {
    expect(isValidPhone('1234567890')).toBe(true);
  });
});

describe('generateListKey', () => {
  it('generates key with prefix, index, and preview', () => {
    const key = generateListKey('item', 0, 'Hello World');
    expect(key).toBe('item-0-hello-world');
  });

  it('converts preview to lowercase', () => {
    const key = generateListKey('item', 1, 'UPPERCASE TEXT');
    expect(key).toBe('item-1-uppercase-text');
  });

  it('replaces spaces with hyphens', () => {
    const key = generateListKey('item', 2, 'multiple spaces here');
    expect(key).toBe('item-2-multiple-spaces-here');
  });

  it('removes special characters', () => {
    const key = generateListKey('item', 3, 'Hello, World! How are you?');
    expect(key).toBe('item-3-hello-world-how-are-you');
  });

  it('truncates long preview to 20 characters', () => {
    const longText = 'This is a very long text that should be truncated';
    const key = generateListKey('item', 4, longText, 20);

    const parts = key.split('-');
    const preview = parts.slice(2).join('-');
    expect(preview.length).toBeLessThanOrEqual(20);
  });

  it('handles empty preview string', () => {
    const key = generateListKey('item', 5, '');
    expect(key).toBe('item-5-');
  });

  it('handles preview with only special characters', () => {
    const key = generateListKey('item', 6, '!@#$%^&*()');
    expect(key).toBe('item-6-');
  });

  it('handles different prefixes', () => {
    const key1 = generateListKey('benefit', 0, 'First item');
    const key2 = generateListKey('cost', 0, 'First item');

    expect(key1).toBe('benefit-0-first-item');
    expect(key2).toBe('cost-0-first-item');
    expect(key1).not.toBe(key2);
  });

  it('handles different indices', () => {
    const key1 = generateListKey('item', 0, 'Same text');
    const key2 = generateListKey('item', 1, 'Same text');

    expect(key1).not.toBe(key2);
  });

  it('preserves preview text differences', () => {
    const key1 = generateListKey('item', 0, 'Different');
    const key2 = generateListKey('item', 0, 'Text');

    expect(key1).not.toBe(key2);
  });
});
