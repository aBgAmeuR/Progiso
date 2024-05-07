'use client';

import { ICard, IColumn } from '../types';
import { BurnBarrel } from './burn-barrel';
import { KanbanProvider } from './kanban';
import { Column } from './tasks-colums';

import { useTasksBoard } from '@/hooks/use-tasks-board';
import { UseTasksMutation } from '@/hooks/use-tasks-mutation';

type TTasksBoardProps = {
  initalCards: ICard[];
  initalColumns: IColumn[];
};

export const TasksBoard = ({
  initalCards,
  initalColumns,
}: TTasksBoardProps) => {
  const { isError, kanban, cards, columns, setCards } = useTasksBoard({
    initalCards,
    initalColumns,
  });
  const { mutation } = UseTasksMutation(kanban);

  if (isError) return <div>Error</div>;

  return (
    <KanbanProvider mutation={mutation}>
      <div className="flex size-full gap-3">
        {columns
          .sort((a, b) => a.order - b.order)
          .map((column) => (
            <Column
              key={column.id}
              column={column}
              cards={cards}
              columnsLength={columns.length}
              setCards={setCards}
            />
          ))}
        <BurnBarrel />
      </div>
    </KanbanProvider>
  );
};
