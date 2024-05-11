import React from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { changeRoleOfMemberAction } from '../actions';
import { TMember } from '../types';
import { ROLES } from '../types';
import { getRoleBadgeColor } from '../utils';
import { DeleteTasksDialog } from './remove-member-dialog';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { getErrorMessage } from '@/lib/handle-error';

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

const formatRole = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
};

type TMemberTableRowProps = {
  member: TMember;
  currentUserRole: string;
};

export const MemberTableRow = ({
  member,
  currentUserRole,
}: TMemberTableRowProps) => {
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  return (
    <TableRow>
      <DeleteTasksDialog
        open={showDeleteTaskDialog}
        onOpenChange={(e) => setShowDeleteTaskDialog(e)}
        memberId={member.id}
      />
      <TableCell>
        <Avatar className="size-8">
          <AvatarImage src={member.user.image!} />
          <AvatarFallback>
            {member.user.name && member.user.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>{member.user.name || 'Unknown'}</TableCell>
      <TableCell>{formatDateTime(member.joined_at)}</TableCell>
      <TableCell>
        <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="data-[state=open]:bg-muted flex size-8 p-0"
            >
              <DotsHorizontalIcon className="size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onSelect={() => toast('Contact member')}>
              Contact
              <DropdownMenuShortcut>C</DropdownMenuShortcut>
            </DropdownMenuItem>
            {member.role !== 'OWNER' &&
            ['OWNER', 'ADMIN'].includes(currentUserRole) ? (
              <>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={member.role}
                      onValueChange={(value) =>
                        toast.promise(
                          changeRoleOfMemberAction(member.id, value),
                          {
                            loading: 'Changing role...',
                            success: 'Role changed successfully!',
                            error: (error) => getErrorMessage(error),
                          }
                        )
                      }
                    >
                      {ROLES.map((role) => (
                        <DropdownMenuRadioItem
                          key={role}
                          value={role}
                          className="capitalize"
                        >
                          {formatRole(role)}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteTaskDialog(true)}
                >
                  Delete
                  <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
