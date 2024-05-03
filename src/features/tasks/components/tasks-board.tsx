'use client';

import { useState } from 'react';

import { DEFAULT_CARDS, DEFAULT_COLUMNS, ICard, IColumn } from '../types';
import { BurnBarrel } from './burn-barrel';
import { Column } from './tasks-colums';

export const TasksBoard = () => {
  const [cards, setCards] = useState<ICard[]>(DEFAULT_CARDS);
  const [colums, setColumns] = useState<IColumn[]>(DEFAULT_COLUMNS);

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

  return (
    <div className="flex size-full gap-3 overflow-scroll">
      {colums
        .sort((a, b) => a.order - b.order)
        .map((column, index) => (
          <Column
            key={column.id}
            column={column.id}
            title={column.title}
            headingColor={column.headingColor}
            id={column.id}
            cards={cards}
            setCards={setCards}
            switchColumns={switchColumns}
            columnsLength={colums.length}
            order={index}
            deleteColumn={deleteColumn}
          />
        ))}
      <BurnBarrel setCards={setCards} />
    </div>
  );
};
