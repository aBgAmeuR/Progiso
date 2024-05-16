import {
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  ThumbsUpIcon,
} from 'lucide-react';

export const PageFeatures = () => {
  return (
    <>
      {/* Icon Blocks */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Collaborative tools to design better user experience
            </h2>
            <p className="text-muted-foreground mt-3">
              We help businesses bring ideas to life in the digital world, by
              designing and implementing the technology tools that they need to
              win.
            </p>
            <p className="mt-5">
              <a
                className="group inline-flex items-center gap-x-1 font-medium underline-offset-4 hover:underline "
                href="#"
              >
                Contact sales to learn more
                <ChevronRightIcon className="size-4 shrink-0 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="bg-primary text-primary-foreground inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border">
                <BookOpenIcon className="size-5 shrink-0" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold sm:text-lg">
                  Industry-leading documentation
                </h3>
                <p className="text-muted-foreground mt-1">
                  Our documentation and extensive Client libraries contain
                  everything a business needs to build a custom integration in a
                  fraction of the time.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="bg-primary text-primary-foreground inline-flex size-[46px] shrink-0 items-center justify-center rounded-full  border">
                <MessagesSquareIcon className="size-5 shrink-0" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold sm:text-lg">
                  Developer community support
                </h3>
                <p className="text-muted-foreground mt-1">
                  We actively contribute to open-source projects—giving back to
                  the community through development, patches, and sponsorships.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="bg-primary text-primary-foreground inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border">
                <ThumbsUpIcon className="size-5 shrink-0" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base font-semibold sm:text-lg">
                  Simple and affordable
                </h3>
                <p className="text-muted-foreground mt-1">
                  From boarding passes to movie tickets, there&apos;s pretty
                  much nothing you can&apos;t do.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </>
  );
};
