// src/utils/dateUtils.ts

/**
 * Format a Date object as an HTML‐compatible input date string (YYYY-MM-DD).
 * @param date  The Date to format
 * @returns     String in “YYYY-MM-DD” format
 */
export function formatDateForInput(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

/**
 * Check if a given date string (YYYY-MM-DD) represents a future date.
 * @param dateStr  The date string from an <input type="date" />
 * @returns        True if the date is strictly after today
 */
export function isDateInFuture(dateStr: string): boolean {
  const today = new Date();
  // Zero out time for comparison
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
    return false; // invalid format
  }

  const inputDate = new Date(year, month - 1, day);
  return inputDate > today;
}

/**
 * Check if a given date string (YYYY-MM-DD) is a business day (Mon–Fri)
 */
export function isBusinessDay(dateStr: string): boolean {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay(); // 0=Sunday, 6=Saturday
  return dayOfWeek >= 1 && dayOfWeek <= 5;
}

/**
 * Get tomorrow’s date as YYYY-MM-DD (for min date)
 */
export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateForInput(tomorrow);
}