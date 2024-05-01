'use server';

import {
  changeTitleOfColumn,
  createTask,
  getColumnsWithTasks,
  updateListOrder,
  updateTaskOrder,
} from '@/features/tasks/services';
import { TColumn, TCreateTask, TTask } from '@/features/tasks/types';

export const createTaskAction = async (task: TCreateTask) => {
  const res = await createTask(task);

  if (!res) return null;

  return { message: 'Task created successfully' };
};

export const getColumnsWithTasksAction = async () => {
  const res = await getColumnsWithTasks();

  if (!res) return null;

  return res;
};

export const updateListOrderAction = async (columns: TColumn[]) => {
  const res = await updateListOrder(columns);

  if (!res) return null;

  return { message: 'Columns order updated successfully' };
};

export const updateTaskOrderAction = async (tasks: TTask[]) => {
  const res = await updateTaskOrder(tasks);

  if (!res) return null;

  return { message: 'Tasks order updated successfully' };
};

export const changeTitleOfColumnAction = async (
  columnId: string,
  title: string
) => {
  const res = await changeTitleOfColumn(columnId, title);

  if (!res) return null;

  return { message: 'Column title updated successfully' };
};
