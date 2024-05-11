'use client';

import * as React from 'react';
import { toast } from 'sonner';

import { removeMemberAction } from '../actions';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getErrorMessage } from '@/lib/handle-error';

interface RemoveMemberDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  memberId: string;
}

export function DeleteTasksDialog({
  memberId,
  ...props
}: RemoveMemberDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove the
            member from the team.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label="Remove member"
              variant="destructive"
              onClick={() => {
                startDeleteTransition(() => {
                  toast.promise(removeMemberAction(memberId), {
                    loading: 'Deleting...',
                    success: 'Member removed successfully!',
                    error: (error) => getErrorMessage(error),
                  });
                });
              }}
              disabled={isDeletePending}
            >
              Remove
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
