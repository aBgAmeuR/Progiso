import { ColumnsContainer } from '@/features/tasksv1/components/columns-container';
import { getColumnsWithTasks } from '@/features/tasksv1/services';

export const TasksBoard = async () => {
  const columns = await getColumnsWithTasks();

  return <ColumnsContainer columns={columns} />;
};
