// Centralized marketing copy for hero and shared sections
export const COPY = {
  hero: {
    h1: 'Branding, websites, and growth systems for small businesses.',
    sub: 'From identity and ADA-clean UI to full-stack apps and profitable ads — Signmons builds the brand and the engine behind it.',
    cta: 'Get a free brand & website plan',
  },
  proof: ['Built for speed', 'ADA-aware design', 'Full-stack cloud', 'Performance marketing'],
} as const;

export type Copy = typeof COPY;
