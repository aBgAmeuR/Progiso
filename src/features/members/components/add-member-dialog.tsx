import React from 'react';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { addProjectMemberAction } from '../actions';
import { ROLES } from '../types';

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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getErrorMessage } from '@/lib/handle-error';

export const AddMemberDialog = () => {
  const [showDialog, setDialog] = React.useState(false);
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const [memberName, setMemberName] = React.useState('');
  const [memberRole, setMemberRole] = React.useState<string>('MEMBER');

  const addMember = () => {
    startDeleteTransition(() => {
      toast.promise(addProjectMemberAction(memberName, memberRole), {
        loading: 'Adding member...',
        success: 'Member added successfully to the project!',
        error: (error) => getErrorMessage(error),
      });
    });

    setDialog(false);
    setMemberName('');
    setMemberRole(ROLES[2]);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialog(true)}>
          <PlusIcon className="mr-2 size-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new member</DialogTitle>
          <DialogDescription>
            Add a new member to the project. Please enter the name and role of
            the new member.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="flex-1"
          />
          <Select
            value={memberRole}
            onValueChange={(value) => setMemberRole(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={addMember} disabled={isDeletePending}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
