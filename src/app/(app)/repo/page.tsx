import { Suspense } from 'react';

import { BreadcrumbPage } from '@/components/breadcrumb-page';
import {
  CommitsSection,
  CommitsSectionSkeleton,
} from '@/features/repository/components/commits-section';
import {
  OverviewSection,
  OverviewSectionSkeleton,
} from '@/features/repository/components/overview-section';
import {
  TopContributorsSection,
  TopContributorsSectionSkeleton,
} from '@/features/repository/components/top-contributors-section';

export default async function RepoPage() {
  return (
    <main className="flex w-[calc(100vw-193px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <BreadcrumbPage pageName="Repository" />
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Repository</h1>
            <p className="text-muted-foreground text-sm">
              View your repository stats
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <Suspense fallback={<OverviewSectionSkeleton />}>
          <OverviewSection />
        </Suspense>
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<CommitsSectionSkeleton />}>
            <CommitsSection />
          </Suspense>
          <Suspense fallback={<TopContributorsSectionSkeleton />}>
            <TopContributorsSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
