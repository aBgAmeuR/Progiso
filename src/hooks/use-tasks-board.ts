import { Dispatch, SetStateAction } from 'react';
import { DropResult } from '@hello-pangea/dnd';

import { useTasksMutation } from './use-tasks-mutation';

import { TColumn, TTask } from '@/features/tasksv1/types';

const reorder = <T extends TColumn | TTask>(
  list: T[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type TUseTasksBoardProps = {
  listData: TColumn[];
  setListData: Dispatch<SetStateAction<TColumn[]>>;
};

export const useTasksBoard = ({
  listData,
  setListData,
}: TUseTasksBoardProps) => {
  const { updateListOrderMutation, updateTaskOrderMutation } =
    useTasksMutation();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'list') {
      const items = reorder<TColumn>(
        listData,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));

      updateListOrderMutation.mutate({
        columns: items,
        setListData,
      });
    }

    if (type === 'task') {
      const newOrderedData = [...listData];

      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;
      if (!sourceList.tasks) sourceList.tasks = [];
      if (!destinationList.tasks) destinationList.tasks = [];

      if (source.droppableId === destination.droppableId) {
        const reOrderedTasks = reorder<TTask>(
          sourceList.tasks,
          source.index,
          destination.index
        );
        reOrderedTasks.forEach((task, index) => {
          task.order = index;
        });
        sourceList.tasks = reOrderedTasks;

        updateTaskOrderMutation.mutate({
          tasks: sourceList.tasks,
          setListData,
          newOrderedData,
        });
      } else {
        const [movedTask] = sourceList.tasks.splice(source.index, 1);
        movedTask.columnId = destinationList.id;

        destinationList.tasks.splice(destination.index, 0, movedTask);
        sourceList.tasks.forEach((task, index) => {
          task.order = index;
        });

        destinationList.tasks.forEach((task, index) => {
          task.order = index;
        });

        updateTaskOrderMutation.mutate({
          tasks: destinationList.tasks,
          setListData,
          newOrderedData,
        });
      }
    }
  };

  return { onDragEnd };
};
