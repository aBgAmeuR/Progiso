import { Suspense } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import {
  CommitsSection,
  CommitsSectionSkeleton,
} from '@/features/repository/components/commits-section';
import { TasksCardDiagram } from '@/features/tasks/components/tasks-card-diagram';

export default async function BoardPage() {
  return (
    <main className="flex w-[calc(100vw-193px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/board">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              View your dashboard stats
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <TasksCardDiagram />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Suspense fallback={<CommitsSectionSkeleton />}>
            <CommitsSection nbCommits={3} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
