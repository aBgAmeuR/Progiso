import { ColumnsContainer } from '@/features/tasks/components/columns-container';
import { getColumnsWithTasks } from '@/features/tasks/services';

export const TasksBoard = async () => {
  const columns = await getColumnsWithTasks();

  return <ColumnsContainer columns={columns} />;
};
