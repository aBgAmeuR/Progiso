import { Suspense } from 'react';

import { BreadcrumbPage } from '@/components/breadcrumb-page';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TasksBoardSSR } from '@/features/tasks/components/tasks-board-ssr';

export default async function TasksPage() {
  return (
    <main className="flex w-[calc(100vw-193px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <BreadcrumbPage pageName="Tasks" />
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Tasks</h1>
            <p className="text-muted-foreground text-sm">
              Manage your tasks and keep track of your progress
            </p>
          </div>
        </div>
      </div>
      <ScrollArea className="flex flex-1">
        <Suspense fallback={null}>
          <TasksBoardSSR />
        </Suspense>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </main>
  );
}
