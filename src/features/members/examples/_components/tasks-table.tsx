'use client';

import * as React from 'react';

import { getProjectMembers, getProjectRoles } from '../../services';
// import { getPriorityIcon, getStatusIcon } from '../_lib/utils';
import { getColumns } from './tasks-table-columns';
import { useTasksTable } from './tasks-table-provider';

// import { TasksTableToolbarActions } from './tasks-table-toolbar-actions';
// import { DataTableAdvancedToolbar } from '@/components/data-table/advanced/data-table-advanced-toolbar';
import { DataTable } from '@/components/data-table/data-table';
// import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import type { DataTableFilterField } from '@/components/data-table/types';
import { TMember } from '@/features/members/types';
import { useDataTable } from '@/hooks/use-data-table';

interface TasksTableProps {
  membersPromise: ReturnType<typeof getProjectMembers>;
  projectRolesPromise: ReturnType<typeof getProjectRoles>;
}

export function TasksTable({
  membersPromise,
  projectRolesPromise,
}: TasksTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useTasksTable();

  const members = React.use(membersPromise);
  const data = members ? members.data : [];
  const pageCount = members ? members.pageCount : 0;

  const projectRoles = React.use(projectRolesPromise);

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(
    () => getColumns({ projectRolees: projectRoles || [] }),
    [projectRoles]
  );

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<TMember>[] = [
    {
      label: 'Title',
      value: 'role',
      placeholder: 'Filter titles...',
    },
    /**{
      label: 'Status',
      value: 'role',
      options: members.status.enumValues.map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
        icon: getStatusIcon(status),
        withCount: true,
      })),
    },
    {
      label: 'Priority',
      value: 'user",
      options: members.priority.enumValues.map((priority) => ({
        label: priority[0]?.toUpperCase() + priority.slice(1),
        value: priority,
        icon: getPriorityIcon(priority),
        withCount: true,
      })),
    },*/
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // optional props
    filterFields,
    enableAdvancedFilter: featureFlags.includes('advancedFilter'),
    defaultPerPage: 10,
    defaultSort: 'name.asc',
  });

  return (
    <div className="w-full space-y-2.5 overflow-auto">
      {/**featureFlags.includes('advancedFilter') ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )*/}
      <DataTable
        table={table}
        floatingBar={
          /*           featureFlags.includes('floatingBar') ? (
            <TasksTableFloatingBar table={table} />
          ) : null */
          null
        }
      />
    </div>
  );
}
