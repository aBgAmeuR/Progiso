import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  updateListOrderAction,
  updateTaskOrderAction,
} from '@/features/tasksv1/actions';
import { TColumn, TTask } from '@/features/tasksv1/types';
import { getErrorMessage } from '@/lib/handle-error';

type TUpdateListOrderMutationProps = {
  columns: TColumn[];
  setListData: Dispatch<SetStateAction<TColumn[]>>;
};

type TUpdateTaskOrderMutationProps = {
  tasks: TTask[];
  setListData: Dispatch<SetStateAction<TColumn[]>>;
  newOrderedData: TColumn[];
};

export const useTasksMutation = () => {
  const queryClient = useQueryClient();

  const updateListOrderMutation = useMutation({
    mutationFn: async ({ columns }: TUpdateListOrderMutationProps) => {
      const res = toast.promise(updateListOrderAction(columns), {
        loading: 'Updating columns order...',
        success: 'Columns order updated successfully',
        error: (err) => getErrorMessage(err),
      });
      return res;
    },
    onMutate: async ({
      columns,
      setListData,
    }: TUpdateListOrderMutationProps) => {
      setListData(columns);

      return columns;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTaskOrderMutation = useMutation({
    mutationFn: async ({ tasks }: TUpdateTaskOrderMutationProps) => {
      const res = toast.promise(updateTaskOrderAction(tasks), {
        loading: 'Updating tasks order...',
        success: 'Tasks order updated successfully',
        error: (err) => getErrorMessage(err),
      });
      return res;
    },
    onMutate: async ({
      setListData,
      newOrderedData,
    }: TUpdateTaskOrderMutationProps) => {
      setListData(newOrderedData);

      return newOrderedData;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    updateListOrderMutation,
    updateTaskOrderMutation,
  };
};
