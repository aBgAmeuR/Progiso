export type ICard = {
  id: string;
  title: string;
  column: string;
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  headingColor: string;
};

export const DEFAULT_CARDS = [
  // BACKLOG
  { title: 'Look into render bug in dashboard', id: '1', column: 'c1' },
  { title: 'SOX compliance checklist', id: '2', column: 'c1' },
  { title: '[SPIKE] Migrate to Azure', id: '3', column: 'c1' },
  { title: 'Document Notifications service', id: '4', column: 'c1' },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'c2',
  },
  { title: 'Postmortem for outage', id: '6', column: 'c2' },
  { title: 'Sync with product on Q3 roadmap', id: '7', column: 'c2' },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'c3',
  },
  { title: 'Add logging to daily CRON', id: '9', column: 'c3' },
  // DONE
  {
    title: 'Set up DD dashboards for Lambda listener',
    id: '10',
    column: 'c4',
  },
];

export const DEFAULT_COLUMNS = [
  {
    id: 'c1',
    title: 'Backlogzz',
    order: 1,
    headingColor: 'text-neutral-600 dark:text-neutral-200',
  },
  {
    id: 'c2',
    title: 'TODO',
    order: 2,
    headingColor: 'text-yellow-600 dark:text-yellow-200',
  },
  {
    id: 'c3',
    title: 'In progress',
    order: 3,
    headingColor: 'text-blue-600 dark:text-blue-200',
  },
  {
    id: 'c4',
    title: 'Complete',
    order: 4,
    headingColor: 'text-emerald-600 dark:text-emerald-200',
  },
];
