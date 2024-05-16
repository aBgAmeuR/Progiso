import Link from 'next/link';

import { Announcement } from '@/components/announcement';
import HeroImage from '@/components/hero-image';
import { Icons } from '@/components/icons';
import { PageCta } from '@/components/page-cta';
import { PageFeatures } from '@/components/page-features';
import { PageFooter } from '@/components/page-footer';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/constant';
import { cn } from '@/lib/utils';

const Home = () => {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>
          Collaborate Seamlessly with Progiso
        </PageHeaderHeading>
        <PageHeaderDescription>
          Streamline your workflow with Progiso, the ultimate project management
          platform for small to medium-sized teams. Efficient. Intuitive. Open
          Source.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/projects" className={cn(buttonVariants())}>
            Get Started
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.github className="mr-2 size-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      <section className="hidden md:block">
        <div
          className="bg-muted/40 overflow-hidden rounded-lg border shadow"
          style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }}
        >
          <div className="not-prose w-full overflow-hidden rounded-lg border">
            <HeroImage />
          </div>
        </div>
      </section>
      <PageFeatures />
      <PageCta />
      <PageFooter />
    </div>
  );
};

export default Home;
