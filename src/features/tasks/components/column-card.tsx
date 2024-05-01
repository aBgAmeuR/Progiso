import { Draggable, Droppable } from '@hello-pangea/dnd';

import { Card, CardContent } from '@/components/ui/card';
import { ColumnCardHeader } from '@/features/tasks/components/column-card-header';
import { TaskCard } from '@/features/tasks/components/task-card';
import { TColumn } from '@/features/tasks/types';

type TColumnsCardProps = {
  index: number;
  list: TColumn;
};

export const ColumnsCard = ({ index, list }: TColumnsCardProps) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-muted/40 w-72"
        >
          <ColumnCardHeader
            defaultTitle={list.title}
            tasksCount={list.tasks.length}
            listId={list.id}
          />
          <CardContent className="h-5/6 p-3">
            <Droppable droppableId={list.id} type="task">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex h-full flex-col gap-3"
                >
                  {list && list.tasks
                    ? list.tasks.map((task, index) => (
                        <TaskCard key={task.id} index={index} task={task} />
                      ))
                    : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};
