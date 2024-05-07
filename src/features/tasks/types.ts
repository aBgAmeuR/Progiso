export type ICard = {
  id: string;
  title: string;
  column: string;
  order: number;
  tag: ITag | null;
  assignees: {
    id: string;
    name: string | null;
    image: string | null;
  };
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

export const DEFAULT_TAGS = [
  {
    name: 'BackEnd',
    color: 'bg-blue-600 hover:bg-blue-600',
  },
  {
    name: 'FrontEnd',
    color: 'bg-yellow-600 hover:bg-yellow-600',
  },
  {
    name: 'Production',
    color: 'bg-green-600 hover:bg-green-600',
  },
  {
    name: 'Test',
    color: 'bg-red-600 hover:bg-red-600',
  },
  {
    name: 'Preview',
    color: 'bg-purple-600 hover:bg-purple-600',
  },
  {
    name: 'Feature',
    color: 'bg-indigo-600 hover:bg-indigo-600',
  },
  {
    name: 'Bug',
    color: 'bg-pink-600 hover:bg-pink-600',
  },
] as const;
