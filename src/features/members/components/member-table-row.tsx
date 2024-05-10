import React from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { changeRoleOfMemberAction } from '../actions';
import { getRoleBadgeColor } from '../utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getErrorMessage } from '@/lib/handle-error';

type TMembersTableProps = {
  member: {
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    role: string;
  };
};

const roles = [
  { role: 'ADMIN' },
  { role: 'DEVELOPPER' },
  { role: 'TESTER' },
  { role: 'VISITOR' },
];

const formatRole = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
};

export const MemberTableRow = ({ member }: TMembersTableProps) => {
  const showAvatar = member.user.name && member.user.image;
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  return (
    <div className="flex justify-between p-4">
      <p className="line-clamp-1 w-60">{member.user.id}</p>
      <div className="flex items-center gap-2">
        {showAvatar ? (
          <Avatar className="size-6">
            <AvatarImage src={member.user.image!} />
            <AvatarFallback>
              {member.user.name && member.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        ) : null}
        <p>{member.user.name}</p>
      </div>
      <div className="flex w-auto items-center justify-start">
        <Badge className={getRoleBadgeColor(member.role)}>{member.role}</Badge>
      </div>
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
          {/* <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
            Edit
          </DropdownMenuItem> */}
          {member.role !== 'OWNER' ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={member.role}
                  onValueChange={(value) => {
                    startUpdateTransition(() => {
                      toast.promise(
                        changeRoleOfMemberAction(member.user.id, value),
                        {
                          loading: 'Updating...',
                          success: 'Role updated',
                          error: (err) => getErrorMessage(err),
                        }
                      );
                    });
                  }}
                >
                  {roles?.map(({ role }) => (
                    <DropdownMenuRadioItem
                      key={role}
                      value={role}
                      className="capitalize"
                      disabled={isUpdatePending}
                    >
                      {formatRole(role)}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : null}
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
