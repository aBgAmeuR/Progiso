import { ICard, IColumn } from '../types';
import { AddCard } from './add-card';
import { DropIndicator } from './drop-indicator';
import { Card } from './task-card';
import { TasksColumnHeader } from './tasks-column-header';

import { useTasksColumn } from '@/hooks/use-tasks-column';
import { cn } from '@/lib/utils';

type TColumProps = {
  column: IColumn;
  cards: ICard[];
  columnsLength: number;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  switchColumns: (id: string, direction: 'left' | 'right') => void;
  deleteColumn: (id: string) => void;
};

export const Column = ({
  column,
  cards,
  columnsLength,
  setCards,
  switchColumns,
  deleteColumn,
}: TColumProps) => {
  const {
    active,
    filteredCards,
    handleDragEnd,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
  } = useTasksColumn({
    column,
    cards,
    setCards,
  });

  return (
    <div className="w-56 shrink-0">
      <TasksColumnHeader
        column={column}
        columnsLength={columnsLength}
        order={column.order}
        lengthIndicator={filteredCards.length}
        switchColumns={switchColumns}
        deleteColumn={deleteColumn}
      />
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'size-full transition-colors',
          active ? 'bg-secondary/50' : 'bg-secondary/0'
        )}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column.id} />
        <AddCard column={column.id} setCards={setCards} />
      </div>
    </div>
  );
};
