export type TCommit = {
  node: {
    committedDate: Date;
    author: {
      avatarUrl: string;
      name: string;
    };
    message: string;
    abbreviatedOid: string;
    commitUrl: string;
    status: {
      state: 'SUCCESS' | 'FAILURE';
    } | null;
  };
};

export type TContributor = {
  login: string;
  id: 113059124;
  avatar_url: string;
  html_url: string;
  contributions: number;
};
