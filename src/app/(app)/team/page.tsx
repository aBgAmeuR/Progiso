import { BreadcrumbPage } from '@/components/breadcrumb-page';
import { MembersTableSSR } from '@/features/members/components/members-table-ssr';

export default async function TeamPage() {
  return (
    <main className="flex w-[calc(100vw-193px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <BreadcrumbPage pageName="Team" />
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Project Team</h1>
            <p className="text-muted-foreground text-sm">
              Manage your project team members
            </p>
          </div>
        </div>
      </div>
      <MembersTableSSR />
    </main>
  );
}
