import { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRightLeft,
  Check,
  Ellipsis,
  Pencil,
  Trash2,
} from 'lucide-react';

import { DeleteColumnDialog } from './delete-colum-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type TTasksColumnHeaderProps = {
  id: string;
  title: string;
  color: string;
  lengthIndicator: number;
  order: number;
  columnsLength: number;
  switchColumns: (id: string, direction: 'left' | 'right') => void;
  deleteColumn: (id: string) => void;
};

export const TasksColumnHeader = ({
  id,
  title,
  color,
  lengthIndicator,
  switchColumns,
  columnsLength,
  order,
  deleteColumn,
}: TTasksColumnHeaderProps) => {
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const showLeftSwitch = order > 0;
  const showRightSwitch = order < columnsLength;

  return (
    <div className="group mb-3 flex items-center justify-between">
      <DeleteColumnDialog
        columnId={id}
        columnTitle={title}
        deleteColumn={deleteColumn}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        showTrigger={false}
      />
      {isEditTitle ? (
        <div className="flex items-center gap-2">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            variant="outline"
            sizes="sm"
            autoFocus
            className={cn('h-6 p-0 text-base font-medium', color)}
          />
          <Check
            onClick={() => setIsEditTitle(false)}
            className="bg-secondary hover:bg-primary size-6 cursor-pointer rounded-sm p-1"
          />
        </div>
      ) : (
        <>
          <div className="flex w-5/6 items-center gap-2">
            <h3 className={cn('truncate font-medium', color)}>{editTitle}</h3>

            <DropdownMenu>
              <DropdownMenuTrigger className="focus-visible:outline-none">
                <Ellipsis className="hidden size-5 focus-visible:outline-none group-hover:block" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="flex items-center gap-1"
                  onClick={() => setIsEditTitle(true)}
                >
                  <Pencil className="size-4" />
                  <p>Edit Title</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {showLeftSwitch ? (
                  <DropdownMenuItem
                    className="flex items-center gap-1"
                    onClick={() => switchColumns(id, 'left')}
                  >
                    <ArrowLeftRight className="size-4" />
                    <p>Switch Left</p>
                  </DropdownMenuItem>
                ) : null}
                {showRightSwitch ? (
                  <DropdownMenuItem
                    className="flex items-center gap-1"
                    onClick={() => switchColumns(id, 'right')}
                  >
                    <ArrowRightLeft className="size-4" />
                    <p>Switch Right</p>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-primary focus:text-primary flex items-center gap-1"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="size-4" />
                  <p>Delete</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <span className="text-foreground rounded text-sm">
            {lengthIndicator}
          </span>
        </>
      )}
    </div>
  );
};
