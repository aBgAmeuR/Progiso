import * as React from 'react';
import { z } from 'zod';

import { getProjectMembers, getProjectRoles } from '../services';
import { TasksTable } from './_components/tasks-table';
import { TasksTableProvider } from './_components/tasks-table-provider';

import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
// import { DateRangePicker } from '@/components/date-range-picker';
// import { Shell } from '@/components/shell';
import { searchParamsSchema } from '@/features/members/types';

export interface IndexPageProps {
  search: z.infer<typeof searchParamsSchema>;
}

export default async function MembersTable({ search }: IndexPageProps) {
  const membersPromise = getProjectMembers(search);
  const projectRolesPromise = getProjectRoles();

  return (
    <TasksTableProvider>
      {/**
       * The `DateRangePicker` component is used to render the date range picker UI.
       * It is used to filter the tasks based on the selected date range it was created at.
       * The business logic for filtering the tasks based on the selected date range is handled inside the component.
      <DateRangePicker
        triggerSize="sm"
        triggerClassName="ml-auto w-56 sm:w-60"
        align="end"
      />
       */}
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem']}
            shrinkZero
          />
        }
      >
        {/**
         * Passing promises and consuming them using React.use for triggering the suspense fallback.
         * @see https://react.dev/reference/react/use
         */}
        <TasksTable
          membersPromise={membersPromise}
          projectRolesPromise={projectRolesPromise}
        />
      </React.Suspense>
    </TasksTableProvider>
  );
}
