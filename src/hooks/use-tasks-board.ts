import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCardsAction, getColumnsAction } from '@/features/tasks/actions';
import { ICard, IColumn, INewCard } from '@/features/tasks/types';

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

  const { data: columnsData, isError: columnsError } = useQuery({
    queryKey: ['columns'],
    queryFn: async () => await getColumnsAction(),
    initialData: initalColumns,
  });

  const { data: cardsData, isError: cardsError } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => await getCardsAction(),
    initialData: initalCards,
  });

  useEffect(() => {
    setColumns(columnsData || []);
  }, [columnsData]);

  useEffect(() => {
    setCards(cardsData || []);
  }, [cardsData]);

  const createColumn = (title: string, headingColor: string) => {
    const order = columns.length + 1;
    const newColumn = { id: String(order), title, headingColor, order };
    setColumns([...columns, newColumn]);
  };

  const switchColumns = (id: string, direction: 'left' | 'right') => {
    const currentIndex = columns.findIndex((column) => column.id === id);
    const targetIndex =
      direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(columns.length - 1, currentIndex + 1);

    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(currentIndex, 1);

    updatedColumns.splice(targetIndex, 0, movedColumn);
    updatedColumns.forEach((column, index) => (column.order = index + 1));

    setColumns(updatedColumns);
  };

  const deleteColumn = (id: string) => {
    const updatedColumns = columns.filter((column) => column.id !== id);
    const updatedCards = cards.filter((card) => card.column !== id);
    setCards(updatedCards);
    setColumns(updatedColumns);
  };

  const updateColumn = (column: Omit<IColumn, 'order'>) => {
    const updatedColumns = columns.map((col) =>
      col.id === column.id ? { ...col, ...column } : col
    );
    setColumns(updatedColumns);
  };

  const createCard = (card: INewCard) => {
    const order = cards.filter((c) => c.column === card.column).length + 1;
    const newCard = { ...card, id: String(cards.length + 1), order };
    setCards([...cards, newCard]);
  };

  const updateCard = (card: ICard) => {
    const updatedCards = cards.map((c) => (c.id === card.id ? card : c));
    setCards(updatedCards);
  };

  const deleteCard = (id: string) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const isError = columnsError || cardsError;

  return {
    isError,
    kanban: {
      createColumn,
      switchColumns,
      deleteColumn,
      updateColumn,
      createCard,
      updateCard,
      deleteCard,
    },
    columns,
    cards,
    setCards,
  };
};
