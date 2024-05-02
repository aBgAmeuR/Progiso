import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Check, Pencil, X } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { changeTitleOfColumnAction } from '@/features/tasks/actions';
import { getErrorMessage } from '@/lib/handle-error';

type TColumnCardHeaderProps = {
  defaultTitle: string;
  tasksCount: number;
  listId: string;
};

export const ColumnCardHeader: React.FC<TColumnCardHeaderProps> = ({
  defaultTitle,
  tasksCount,
  listId,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(defaultTitle);
  const queryClient = useQueryClient();

  const handleEditTitle = () => {
    toast.promise(changeTitleOfColumnAction(listId, title), {
      loading: 'Updating title...',
      success: 'Title updated successfully',
      error: (err: unknown) => getErrorMessage(err),
    });
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    setIsEditingTitle(false);
  };

  return (
    <CardHeader className="p-3 pb-0">
      {isEditingTitle ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              autoFocus
              minLength={3}
              sizes="sm"
              variant="outline"
              className="hover:bg-card h-8 p-0 text-lg font-semibold"
            />
          </div>
          <div className="flex gap-1">
            <Button
              size="smallIcon"
              variant="outline"
              onClick={() => {
                setIsEditingTitle(false);
                setTitle(defaultTitle);
              }}
            >
              <X className="size-4" />
            </Button>
            <Button
              type="submit"
              size="smallIcon"
              variant="default"
              onClick={handleEditTitle}
            >
              <Check className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
              {tasksCount}
            </Badge>
          </div>
          <div>
            <Button
              size="smallIcon"
              variant="outline"
              onClick={() => setIsEditingTitle(true)}
            >
              <Pencil className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </CardHeader>
  );
};
