import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getColumnsWithTasksAction } from '@/features/tasksv1/actions';
import { TColumn } from '@/features/tasksv1/types';

type TUseTasksProps = {
  initialColumns: TColumn[];
};

export const useTasks = ({ initialColumns }: TUseTasksProps) => {
  const { data, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => await getColumnsWithTasksAction(),
    initialData: initialColumns,
  });

  const [listData, setListData] = useState<TColumn[]>(initialColumns);

  useEffect(() => {
    if (!data) return;
    setListData(data);
  }, [data]);

  return {
    listData,
    setListData,
    isError,
  };
};
