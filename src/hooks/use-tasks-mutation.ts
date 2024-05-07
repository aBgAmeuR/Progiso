import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
import { ICard, IColumn, INewCard } from '@/features/tasks/types';
import { getErrorMessage } from '@/lib/handle-error';

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
    mutationFn: async (newCard: INewCard) => {
      toast.promise(createCardAction(newCard), {
        loading: 'Creating card...',
        success: 'Card created successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
    mutationFn: async (card: ICard) => {
      toast.promise(updateCardAction(card), {
        loading: 'Updating card...',
        success: 'Card updated successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
    mutationFn: async (id: string) => {
      toast.promise(deleteCardAction(id), {
        loading: 'Deleting card...',
        success: 'Card deleted successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
    mutationFn: async ({ title, headingColor }: TCreateColumnMutation) => {
      toast.promise(createColumnAction(title, headingColor), {
        loading: 'Creating column...',
        success: 'Column created successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
    mutationFn: async (column: IColumn) => {
      toast.promise(updateColumnAction(column), {
        loading: 'Updating column...',
        success: 'Column updated successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
    mutationFn: async (id: string) => {
      toast.promise(deleteColumnAction(id), {
        loading: 'Deleting column...',
        success: 'Column deleted successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
    mutationFn: async ({ id, direction }: TSwitchColumnsMutation) => {
      toast.promise(switchColumnsAction(id, direction), {
        loading: 'Switching columns...',
        success: 'Columns switched successfully',
        error: (err: unknown) => getErrorMessage(err),
      });
    },
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
