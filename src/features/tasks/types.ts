export type ICard = {
  id: string;
  title: string;
  column: string;
  order: number;
  tag: ITag | null;
};

export type INewCard = {
  title: string;
  column: string;
  tag: ITag | null;
};

export type IColumn = {
  id: string;
  title: string;
  order: number;
  headingColor: string;
};

export type ITag = {
  name: string;
  color: string;
};

export const DEFAULT_CARDS = [
  // BACKLOG
  {
    title: 'Look into render bug in dashboard',
    id: '1',
    column: 'c1',
    order: 1,
    tag: {
      name: 'BackEnd',
      color: 'bg-blue-500 hover:bg-blue-500',
    },
  },
  {
    title: 'SOX compliance checklist',
    id: '2',
    column: 'c1',
    order: 2,
    tag: {
      name: 'FrontEnd',
      color: 'bg-green-500 hover:bg-green-500',
    },
  },
  {
    title: '[SPIKE] Migrate to Azure',
    id: '3',
    column: 'c1',
    order: 3,
    tag: {
      name: 'Production',
      color: 'bg-yellow-500 hover:bg-yellow-500',
    },
  },
  {
    title: 'Document Notifications service',
    id: '4',
    column: 'c1',
    order: 4,
    tag: null,
  },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'c2',
    order: 1,
    tag: {
      name: 'Test',
      color: 'bg-teal-500 hover:bg-teal-500',
    },
  },
  {
    title: 'Postmortem for outage',
    id: '6',
    column: 'c2',
    order: 2,
    tag: {
      name: 'Preview',
      color: 'bg-indigo-500 hover:bg-indigo-500',
    },
  },
  {
    title: 'Sync with product on Q3 roadmap',
    id: '7',
    column: 'c2',
    order: 3,
    tag: null,
  },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'c3',
    order: 1,
    tag: {
      name: 'Feature',
      color: 'bg-amber-500 hover:bg-amber-500',
    },
  },
  {
    title: 'Add logging to daily CRON',
    id: '9',
    column: 'c3',
    order: 2,
    tag: {
      name: 'Preview',
      color: 'bg-indigo-500 hover:bg-indigo-500',
    },
  },
  // DONE
  {
    title: 'Set up DD dashboards for Lambda listener',
    id: '10',
    column: 'c4',
    order: 1,
    tag: {
      name: 'Bug',
      color: 'bg-purple-500 hover:bg-purple-500',
    },
  },
] satisfies ICard[];

export const DEFAULT_COLUMNS = [
  {
    id: 'c1',
    title: 'Backlog',
    order: 1,
    headingColor: 'text-neutral-400 dark:text-neutral-200',
  },
  {
    id: 'c2',
    title: 'TODO',
    order: 2,
    headingColor: 'text-yellow-400 dark:text-yellow-200',
  },
  {
    id: 'c3',
    title: 'In progress',
    order: 3,
    headingColor: 'text-blue-400 dark:text-blue-200',
  },
  {
    id: 'c4',
    title: 'Complete',
    order: 4,
    headingColor: 'text-emerald-400 dark:text-emerald-200',
  },
] satisfies IColumn[];

export const DEFAULT_TAGS = [
  {
    name: 'Urgent',
    color: 'red',
  },
  {
    name: 'High',
    color: 'yellow',
  },
  {
    name: 'Medium',
    color: 'blue',
  },
  {
    name: 'Low',
    color: 'green',
  },
] as const;
