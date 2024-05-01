import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

import { AvatarStack } from '@/components/ui/avatar-stack';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TTask } from '@/features/tasks/types';

type TTaskCardProps = {
  index: number;
  task: TTask;
};

export const TaskCard = ({ index, task }: TTaskCardProps) => {
  const avatars = task.assignees.map((assignee) => assignee.user);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="w-full"
        >
          <CardContent className="p-3">
            <div>
              {task.tag ? (
                <Badge
                  key={task.tag.id}
                  color={task.tag.color}
                  className="mr-2"
                >
                  {task.tag.name}
                </Badge>
              ) : null}
            </div>
            <h3 className="text-lg font-medium">{task.title}</h3>
            <div>
              <AvatarStack avatars={avatars} size="sm" spacing="xl" />
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};
