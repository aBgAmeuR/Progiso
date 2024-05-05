import { getCards, getColumns } from '../services';
import { TasksBoard } from './tasks-board';

export const TasksBoardSSR = async () => {
  const colums = await getColumns();
  const cards = await getCards();

  if (!colums || !cards) return null;

  return <TasksBoard initalColumns={colums} initalCards={cards} />;
};
