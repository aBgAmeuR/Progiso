'use client';

import { DownloadIcon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

// import { CreateTaskDialog } from './create-task-dialog';
// import { DeleteTasksDialog } from './delete-tasks-dialog';
import { Button } from '@/components/ui/button';
import { TMember } from '@/features/members/types';

interface TasksTableToolbarActionsProps {
  table: Table<TMember>;
}

export function TasksTableToolbarActions({
  table,
}: TasksTableToolbarActionsProps) {
  console.log(table);

  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table.getFilteredSelectedRowModel().rows}
          onSuccess={() => table.toggleAllPageRowsSelected(false)}
        />
      ) : null} */}
      {/* <CreateTaskDialog prevTasks={table.getFilteredRowModel().rows} /> */}
      <Button
        variant="outline"
        size="sm"
        /* onClick={() =>
          exportTableToCSV(table, {
            filename: 'tasks',
            excludeColumns: ['select', 'actions'],
          })
        } */
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, export, import, etc.
       */}
    </div>
  );
}
