export type TConversation = {
  messages: Array<{
    user: TUser;
    id: string;
    created_at: Date;
    content: string;
  }>;
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
