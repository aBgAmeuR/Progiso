import { env } from '@/env.mjs';

export const siteConfig = {
  title: 'Progiso',
  description:
    'Project management platform designed to streamline project management for small to medium-sized teams.',
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'TypeScript',
    'Shadcn/ui',
    'Next-auth',
    'Prisma',
  ],
  url: env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  googleSiteVerificationId: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_ID || '',
  links: {
    github: 'https://github.com/aBgAmeuR/Progiso',
  },
};
