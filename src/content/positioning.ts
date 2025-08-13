// Centralized marketing copy for hero and shared sections
export const COPY = {
  hero: {
    h1: 'Websites. Branding. Marketing.',
    sub: 'Online, on vehicles, on merch — Signmons makes it happen.',
    cta: 'Start your design',
  },
  proof: ['Built for speed', 'ADA-aware design', 'Full-stack cloud', 'Performance marketing'],
} as const;

export type Copy = typeof COPY;
