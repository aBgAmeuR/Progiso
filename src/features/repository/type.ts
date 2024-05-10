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
