'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { ColumnsCard } from '@/features/tasks/components/column-card';
import { TColumn } from '@/features/tasks/types';
import { useTasks } from '@/hooks/use-tasks';
import { useTasksBoard } from '@/hooks/use-tasks-board';

type TColumnsContainerProps = {
  columns: TColumn[];
};

export const ColumnsContainer = ({ columns }: TColumnsContainerProps) => {
  const { listData, setListData, isError } = useTasks({
    initialColumns: columns,
  });
  const { onDragEnd } = useTasksBoard({ listData, setListData });

  if (isError) return <div>Error</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-4"
          >
            {listData.map((list, index) => (
              <ColumnsCard key={list.id} index={index} list={list} />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
