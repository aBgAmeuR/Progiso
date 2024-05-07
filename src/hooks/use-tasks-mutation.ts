import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useTasksBoard } from './use-tasks-board';

import {
  createCardAction,
  createColumnAction,
  deleteCardAction,
  deleteColumnAction,
  switchColumnsAction,
  updateCardAction,
  updateColumnAction,
} from '@/features/tasks/actions';
import { INewCard } from '@/features/tasks/types';

type TUseTasksMutationprops = ReturnType<typeof useTasksBoard>['kanban'];

export const UseTasksMutation = (props: TUseTasksMutationprops) => {
  const queryClient = useQueryClient();
  const {
    createCard,
    updateCard,
    deleteCard,
    createColumn,
    updateColumn,
    deleteColumn,
    switchColumns,
  } = props;

  const createCardMutation = useMutation({
    mutationFn: (newCard: INewCard) => createCardAction(newCard),
    onMutate: async (newCard: INewCard) => {
      await queryClient.cancelQueries({ queryKey: ['cards'] });
      createCard(newCard);
      return newCard;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  const updateCardMutation = useMutation({
    mutationFn: updateCardAction,
    onMutate: async (card) => {
      await queryClient.cancelQueries({ queryKey: ['cards'] });
      updateCard(card);
      return card;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: deleteCardAction,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['cards'] });
      deleteCard(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] });
    },
  });

  type TCreateColumnMutation = {
    title: string;
    headingColor: string;
  };
  const createColumnMutation = useMutation({
    mutationFn: ({ title, headingColor }: TCreateColumnMutation) =>
      createColumnAction(title, headingColor),
    onMutate: async ({ title, headingColor }: TCreateColumnMutation) => {
      await queryClient.cancelQueries({ queryKey: ['columns'] });
      createColumn(title, headingColor);
      return { title, headingColor };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
    },
  });

  const updateColumnMutation = useMutation({
    mutationFn: updateColumnAction,
    onMutate: async (column) => {
      await queryClient.cancelQueries({ queryKey: ['columns'] });
      updateColumn(column);
      return column;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
    },
  });

  const deleteColumnMutation = useMutation({
    mutationFn: deleteColumnAction,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['columns'] });
      deleteColumn(id);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
    },
  });

  type TSwitchColumnsMutation = {
    id: string;
    direction: 'left' | 'right';
  };
  const switchColumnsMutation = useMutation({
    mutationFn: ({ id, direction }: TSwitchColumnsMutation) =>
      switchColumnsAction(id, direction),
    onMutate: async ({ id, direction }: TSwitchColumnsMutation) => {
      await queryClient.cancelQueries({ queryKey: ['columns'] });
      switchColumns(id, direction);
      return { id, direction };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['columns'] });
    },
  });

  return {
    mutation: {
      createCardMutation,
      updateCardMutation,
      deleteCardMutation,
      createColumnMutation,
      updateColumnMutation,
      deleteColumnMutation,
      switchColumnsMutation,
    },
  };
};
