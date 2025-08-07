// src/utils/validationUtils.ts

/**
 * Check if a file’s MIME type is in the allowed list.
 */
export function isAllowedFileType(fileType: string, allowedTypes: readonly string[]): boolean {
  return allowedTypes.includes(fileType);
}

/**
 * Check if a file’s size is under the maximum allowed bytes.
 */
export function isUnderFileSize(fileSize: number, maxBytes: number): boolean {
  return fileSize <= maxBytes;
}

/**
 * Check if the number of files is within the allowed limit.
 */
export function isWithinFileCount(fileCount: number, maxCount: number): boolean {
  return fileCount > 0 && fileCount <= maxCount;
}

/**
 * Trim input to a maximum length, removing leading/trailing whitespace.
 */
export function sanitizeTagline(input: string, maxLen: number = 100): string {
  const trimmed = input.trim();
  return trimmed.length > maxLen ? trimmed.slice(0, maxLen) : trimmed;
}

/**
 * Normalize and validate a hex color string to #RRGGBB.
 * Falls back to '#000000' if invalid.
 */
export function sanitizeHex(input: string): string {
  const hex = input.trim();
  // Accept #RGB as well?
  const fullHex = hex.length === 4 ? '#' + [...hex.slice(1)].map((c) => c + c).join('') : hex;

  return /^#([0-9A-F]{6})$/i.test(fullHex) ? fullHex.toUpperCase() : '#000000';
}

/**
 * Calculate the relative luminance of an sRGB color (per WCAG).
 * @param hex A #RRGGBB string
 */
function luminance(hex: string): number {
  const c = parseInt(hex.slice(1), 16);
  const r = ((c >> 16) & 0xff) / 255;
  const g = ((c >> 8) & 0xff) / 255;
  const b = (c & 0xff) / 255;

  const transform = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));

  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

/**
 * Compute the contrast ratio between two hex colors (per WCAG).
 * Returns a number >= 1.0; WCAG recommends at least 3:1 for UI components.
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const L1 = luminance(sanitizeHex(hex1));
  const L2 = luminance(sanitizeHex(hex2));
  // lighter / darker
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Ensure two colors differ enough for legibility.
 * @param hex1 Primary color
 * @param hex2 Accent color
 * @param minRatio Minimum contrast ratio, default WCAG AA for large text = 3.0
 */
export function ensureContrast(hex1: string, hex2: string, minRatio: number = 3.0): boolean {
  return contrastRatio(hex1, hex2) >= minRatio;
}

// src/utils/validationUtils.ts

/**
 * Is this string a positive integer ≥ min?
 */
export function isPositiveInteger(
  str: string,
  min: number = 0
): boolean {
  const n = Number(str)
  return (
    /^\d+$/.test(str.trim()) && // only digits
    !isNaN(n) &&
    Number.isInteger(n) &&
    n >= min
  )
}

/**
 * Ensure max ≥ min, both positive integers.
 */
export function isWithinRange(
  minStr: string,
  maxStr: string,
  minAllowed: number = 0
): boolean {
  if (!isPositiveInteger(minStr, minAllowed) || !isPositiveInteger(maxStr, minAllowed))
    return false
  return Number(maxStr) >= Number(minStr)
}

