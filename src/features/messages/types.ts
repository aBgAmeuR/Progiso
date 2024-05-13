export type TConversation = {
  messages: TMessage[];
  users: Array<{
    user: TUser;
    role: string;
  }>;
  id: string;
  title: string | null;
  projectId: string;
};

type TUser = {
  id: string;
  name: string | null;
  image: string | null;
};

export type TMessage = {
  id: string;
  content: string;
  created_at: Date;
  user: TUser;
};
