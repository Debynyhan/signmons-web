import { z } from 'zod';

// Simple sanitization: strip HTML tags to prevent XSS
function sanitizeString(s: string): string {
  return s.replace(/<[^>]*>/g, '');
}

// Validation schema for the entire wizard state
export const wizardSchema = z
  .object({
    industry: z.string().nonempty({ message: 'Industry is required' }),
    vehicle: z
      .object({
        type: z.string().nonempty({ message: 'Vehicle type is required' }),
        make: z.string().nonempty({ message: 'Vehicle make is required' }),
        model: z.string().nonempty({ message: 'Vehicle model is required' }),
        year: z.string().regex(/^[0-9]{4}$/, { message: 'Enter a valid year (YYYY)' }),
        color: z.string().nonempty({ message: 'Vehicle color is required' }),
      })
      .required(),
    style: z.string().nonempty({ message: 'Style selection is required' }),
    assets: z
      .object({
        logos: z.array(z.any()).optional(),
        tagline: z.string().transform((val: string) => sanitizeString(val.trim())),
      })
      .required(),
    colors: z
      .object({
        primary: z
          .string()
          .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: 'Primary must be a valid hex color' }),
        accent: z
          .string()
          .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, { message: 'Accent must be a valid hex color' }),
      })
      .required(),
    contact: z
      .object({
        businessName: z
          .string()
          .nonempty({ message: 'Business name is required' })
          .transform((val: string) => sanitizeString(val)),
        email: z.string().email({ message: 'Invalid email address' }),
        phone: z
          .string()
          .nonempty({ message: 'Phone number is required' })
          .transform((val: string) => sanitizeString(val)),
        website: z
          .string()
          .optional()
          .transform((v) => (v ? v.trim() : v))
          .refine(
            (v) => !v || /^https?:\/\//i.test(v) || /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(v),
            { message: 'Invalid website URL' },
          ),
      })
      .required(),
    timeline: z
      .object({
        date: z
          .string()
          .refine((val: string) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
        rush: z.boolean(),
      })
      .required(),
    budget: z
      .object({
        min: z.number().min(0, { message: 'Min budget must be zero or greater' }),
        max: z.number().min(0, { message: 'Max budget must be zero or greater' }),
      })
      .refine((data: { min: number; max: number }) => data.max >= data.min, {
        message: 'Max must be >= Min',
        path: ['max'],
      }),
    details: z
      .object({
        notes: z.string().transform((val: string) => sanitizeString(val.trim())),
      })
      .required(),
  })
  .required();
