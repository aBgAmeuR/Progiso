import Balancer from 'react-wrap-balancer';
import { Github } from 'lucide-react';
import Link from 'next/link';

import { Icons } from './icons';
import { Button } from './ui/button';

export const PageFooter = () => {
  return (
    <footer>
      <div className="container flex flex-col gap-6">
        <div className="grid gap-6">
          <div className="not-prose flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-85"
            >
              <Icons.logo className="size-6" />
              <p className="font-mono text-lg font-bold">Progiso</p>
            </Link>
            <p>
              <Balancer>
                Progiso is a project management platform designed to streamline
                project management for small to medium-sized teams.
              </Balancer>
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-4 md:mb-0 md:flex-row">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
            <Link href="/cookie-policy">Cookie Policy</Link>
          </div>
        </div>
        <div className="not-prose flex flex-col justify-between gap-6 border-t py-6 md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Github />
            </Button>
          </div>
          <p className="text-muted-foreground">
            © <a href="https://github.com/brijr/components">Progiso</a>. All
            rights reserved. 2024-present.
          </p>
        </div>
      </div>
    </footer>
  );
};
