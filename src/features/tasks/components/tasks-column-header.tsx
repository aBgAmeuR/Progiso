import { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRightLeft,
  Check,
  Ellipsis,
  Pencil,
  Trash2,
} from 'lucide-react';

import { IColumn } from '../types';
import { DeleteColumnDialog } from './delete-colum-dialog';
import { useKanbanContext } from './kanban';

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
  column: IColumn;
  lengthIndicator: number;
  order: number;
  columnsLength: number;
};

export const TasksColumnHeader = ({
  column,
  lengthIndicator,
  columnsLength,
  order,
}: TTasksColumnHeaderProps) => {
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(column.title);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const showLeftSwitch = order > 1;
  const showRightSwitch = order < columnsLength;

  const { switchColumnsMutation, updateColumnMutation } = useKanbanContext();

  const changeColumnTitle = () => {
    setIsEditTitle(false);

    if (editTitle === column.title) return;

    updateColumnMutation.mutate({
      ...column,
      title: editTitle,
    });
  };

  return (
    <div className="group mb-3 flex items-center justify-between">
      <DeleteColumnDialog
        columnId={column.id}
        columnTitle={column.title}
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
            className={cn('h-6 p-0 text-base font-medium', column.headingColor)}
          />
          <Check
            onClick={changeColumnTitle}
            className="bg-secondary hover:bg-primary size-6 cursor-pointer rounded-sm p-1"
          />
        </div>
      ) : (
        <>
          <div className="flex w-5/6 items-center gap-2">
            <h3 className={cn('truncate font-medium', column.headingColor)}>
              {editTitle}
            </h3>

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
                    onClick={() =>
                      switchColumnsMutation.mutate({
                        id: column.id,
                        direction: 'left',
                      })
                    }
                  >
                    <ArrowLeftRight className="size-4" />
                    <p>Switch Left</p>
                  </DropdownMenuItem>
                ) : null}
                {showRightSwitch ? (
                  <DropdownMenuItem
                    className="flex items-center gap-1"
                    onClick={() =>
                      switchColumnsMutation.mutate({
                        id: column.id,
                        direction: 'right',
                      })
                    }
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
