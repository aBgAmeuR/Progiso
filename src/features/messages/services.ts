import { getSelectedProject } from '../projects';

import { getServerSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const createConversation = async (data: {
  title?: string | undefined;
  members: string[];
}) => {
  const session = await getServerSession();
  if (!session) return null;

  const selectedProject = session.user.selectProject;
  if (!selectedProject) return null;

  if (data.members.length === 0) return null;

  const creatorId = await prisma.projectMember.findFirst({
    where: {
      projectId: selectedProject.id,
      userId: session.user.id,
    },
    select: {
      id: true,
    },
  });

  if (!creatorId) return null;

  const membersId = data.members.map((id) => ({ id }));
  membersId.push({ id: creatorId.id });

  if (data.members.length === 1) {
    const conversation = await prisma.conversation.findFirst({
      where: {
        users: {
          every: {
            id: {
              in: membersId.map((id) => id.id),
            },
          },
        },
      },
    });

    if (conversation) return conversation;
  }

  await prisma.conversation.create({
    data: {
      title: data.title,
      users: {
        connect: membersId,
      },
      project: {
        connect: {
          id: selectedProject.id,
        },
      },
    },
  });

  return 'ok';
};

export const getConversations = async () => {
  const selectedProject = await getSelectedProject();
  if (!selectedProject) return null;

  const conversations = await prisma.conversation.findMany({
    where: {
      projectId: selectedProject.id,
    },
    include: {
      users: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          content: true,
          created_at: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        take: 1,
      },
    },
  });

  return conversations;
};

export const getConversation = async (id: string, withCurentUser?: boolean) => {
  const session = await getServerSession();
  if (!session) return null;

  const conversation = await prisma.conversation.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          content: true,
          created_at: true,
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!conversation) return null;

  if (!withCurentUser) {
    conversation.users = conversation.users.filter(
      (user) => user.user.id !== session.user.id
    );
  }

  return conversation;
};

export const getMembersListofProject = async () => {
  const session = await getServerSession();
  if (!session) return null;

  const selectedProject = session.user.selectProject;
  if (!selectedProject) return null;

  const members = await prisma.project.findUnique({
    where: {
      id: selectedProject.id,
    },
    select: {
      members: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          id: true,
        },
      },
    },
  });

  const user = members?.members
    .map((member) => ({
      value: member.id,
      label: member.user.name,
      image: member.user.image,
    }))
    .filter((member) => member.label !== session.user.name);

  return user || [];
};

export const sendMessage = async (conversationId: string, content: string) => {
  const session = await getServerSession();
  if (!session) return null;

  const message = await prisma.message.create({
    data: {
      content,
      conversationId,
      userId: session.user.id,
    },
  });

  return message;
};

export const getMessagesOfConversation = async (conversationId: string) => {
  const session = await getServerSession();
  if (!session) return null;

  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return messages;
};
