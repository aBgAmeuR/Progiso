import { SearchParams } from '@/components/data-table/types';
import MembersTable from '@/features/members/examples/page';
import { searchParamsSchema } from '@/features/members/types';

export interface IndexPageProps {
  searchParams: SearchParams;
}

export default async function TeamPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Team</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <MembersTable search={search} />
        </div>
      </div>
    </main>
  );
}
