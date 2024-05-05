import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCardsAction, getColumnsAction } from '@/features/tasks/actions';
import { createCardAction } from '@/features/tasks/actions';
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
  const queryClient = useQueryClient();

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

  const createCardMutation = useMutation({
    mutationFn: async (newCard: INewCard) => {
      const order =
        cards.filter((card) => card.column === newCard.column).length + 1;
      return await createCardAction({
        ...newCard,
        order,
      });
    },
    onMutate: async (newCard: INewCard) => {
      queryClient.cancelQueries({ queryKey: ['cards'] });

      const order =
        cards.filter((card) => card.column === newCard.column).length + 1;
      setCards((prevCards) => [
        ...prevCards,
        {
          id: 'temp',
          ...newCard,
          order,
        },
      ]);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  const isError = columnsError || cardsError;

  return {
    isError,
    cards,
    setCards,
    columns,
    setColumns,
    switchColumns,
    deleteColumn,
    createCardMutation,
  };
};
