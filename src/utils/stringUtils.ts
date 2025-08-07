// src/utils/stringUtils.ts

/**
 * Trim input and clamp to a maximum length.
 * @param input    The raw user string
 * @param maxLen   Maximum allowed length
 * @returns        Trimmed and clamped string
 */
export function trimAndClamp(input: string, maxLen: number): string {
  const trimmed = input.trim();
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

/**
 * Basic email validation using a conservative regex (RFC 5322 simplified).
 * @param email  The email string to validate
 * @returns      True if it looks like a valid email
 */
export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Basic phone number validation (E.164-ish), allowing +, spaces, dashes.
 * @param phone  The phone string to validate
 * @returns      True if it looks like a valid phone number
 */
export function isValidPhone(phone: string): boolean {
  const normalized = phone.trim();
  // Accept formats like "+1234567890", "123-456-7890", "(123) 456 7890"
  const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return re.test(normalized);
}

/**
 * Strip out any HTML tags to prevent XSS via user text.
 * Very simple—removes anything between `<` and `>`.
 * Use a full sanitizer (DOMPurify) server-side if you need richer HTML.
 * @param input  The raw user string
 */
export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}
