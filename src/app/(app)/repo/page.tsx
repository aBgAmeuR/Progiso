import { BreadcrumbPage } from '@/components/breadcrumb-page';
import { CommitsSection } from '@/features/repository/components/commits-section';
import { OverviewSection } from '@/features/repository/components/overview-section';
import { TopContributorsSection } from '@/features/repository/components/top-contributors-section';

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
        <OverviewSection />
        <div className="grid grid-cols-2 gap-6">
          <CommitsSection />
          <TopContributorsSection />
        </div>
      </div>
    </main>
  );
}
