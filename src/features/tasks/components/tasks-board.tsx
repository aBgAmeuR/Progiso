'use client';

import { ICard, IColumn } from '../types';
import { BurnBarrel } from './burn-barrel';
import { Column } from './tasks-colums';

import { useTasksBoard } from '@/hooks/use-tasks-board';

type TTasksBoardProps = {
  initalCards: ICard[];
  initalColumns: IColumn[];
};

export const TasksBoard = ({
  initalCards,
  initalColumns,
}: TTasksBoardProps) => {
  const { cards, setCards, columns, switchColumns, deleteColumn } =
    useTasksBoard({ initalCards, initalColumns });

  return (
    <div className="flex size-full gap-3">
      {columns
        .sort((a, b) => a.order - b.order)
        .map((column) => (
          <Column
            key={column.id}
            column={column}
            cards={cards}
            setCards={setCards}
            switchColumns={switchColumns}
            columnsLength={columns.length}
            deleteColumn={deleteColumn}
          />
        ))}
      <BurnBarrel setCards={setCards} />
    </div>
  );
};
