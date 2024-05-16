import Balancer from 'react-wrap-balancer';
import Link from 'next/link';

import { Button } from './ui/button';

export const PageCta = () => {
  return (
    <div className="container pb-24">
      <div className="bg-accent/40 flex flex-col items-center gap-2 rounded-lg border p-6 text-center md:rounded-xl md:p-12">
        <h2 className="text-3xl font-semibold tracking-tight">
          Lorem ipsum dolor sit amet
        </h2>
        <h3 className="text-muted-foreground">
          <Balancer>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </Balancer>
        </h3>
        <div className="not-prose mx-auto mt-4 flex items-center gap-2">
          <Button asChild>
            <Link href="#">Get Started</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#">Learn More {'->'}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
