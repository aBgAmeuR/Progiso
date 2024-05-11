export type TMember = {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  role: string;
  joined_at: Date;
  id: string;
};

export const ROLES = ['ADMIN', 'MEMBER', 'GUEST'] as const;
