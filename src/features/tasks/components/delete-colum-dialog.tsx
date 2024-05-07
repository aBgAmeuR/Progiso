'use client';

import * as React from 'react';
import { TrashIcon } from '@radix-ui/react-icons';

import { useKanbanContext } from './kanban';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteColumnDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  columnId: string;
  columnTitle: string;
  onSuccess?: () => void;
  showTrigger?: boolean;
}

export function DeleteColumnDialog({
  columnId,
  columnTitle,
  showTrigger = true,
  ...props
}: DeleteColumnDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const { deleteColumnMutation } = useKanbanContext();

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({columnTitle})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            <span className="font-medium">{columnTitle}</span> column from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={() => {
                startDeleteTransition(() => {
                  deleteColumnMutation.mutate(columnId);
                });
              }}
              disabled={isDeletePending}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
