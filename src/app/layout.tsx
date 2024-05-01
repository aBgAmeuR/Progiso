import '@/styles/globals.css';

import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Toaster as SonnerToaster } from 'sonner';

import { Navbar } from '@/components/navbar/navbar';
import { QueryProvider } from '@/components/query-provider';
import { SessionProvider } from '@/components/session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipsProvider } from '@/components/tooltips-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/lib/constant';
import { fonts } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  verification: {
    google: siteConfig.googleSiteVerificationId,
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: '/opengraph-image.png',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: '/opengraph-image.png',
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background flex min-h-screen flex-col font-sans',
          fonts
        )}
      >
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider attribute="class">
              <TooltipsProvider>
                <Navbar />
                {children}
                <Toaster />
                <SonnerToaster richColors={true} />
              </TooltipsProvider>
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
