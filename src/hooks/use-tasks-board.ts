import { useState } from 'react';

import { ICard, IColumn } from '@/features/tasks/types';

type TUseTasksBoardProps = {
  initalCards: ICard[];
  initalColumns: IColumn[];
};

export const useTasksBoard = ({
  initalCards,
  initalColumns,
}: TUseTasksBoardProps) => {
  const [cards, setCards] = useState<ICard[]>(initalCards);
  const [columns, setColumns] = useState<IColumn[]>(initalColumns);

  const switchColumns = (id: string, direction: 'left' | 'right') => {
    setColumns((prevColumns) => {
      const currentIndex = prevColumns.findIndex((column) => column.id === id);
      const targetIndex =
        direction === 'left'
          ? Math.max(0, currentIndex - 1)
          : Math.min(prevColumns.length - 1, currentIndex + 1);
      const updatedColumns = [...prevColumns];
      const [movedColumn] = updatedColumns.splice(currentIndex, 1);
      updatedColumns.splice(targetIndex, 0, movedColumn);
      updatedColumns.forEach((column, index) => {
        column.order = index + 1;
      });
      return updatedColumns;
    });
  };

  const deleteColumn = (id: string) => {
    setColumns((prevColumns) => {
      const updatedColumns = prevColumns.filter((column) => column.id !== id);
      setCards((prevCards) =>
        prevCards.filter((card) =>
          updatedColumns.some((column) => column.id === card.column)
        )
      );
      return updatedColumns;
    });
  };

  return {
    cards,
    setCards,
    columns,
    setColumns,
    switchColumns,
    deleteColumn,
  };
};
