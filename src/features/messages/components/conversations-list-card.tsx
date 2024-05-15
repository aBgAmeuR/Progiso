import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ConversationList } from './conversations-list';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getSelectProject } from '@/lib/auth';

type TConversationListCardProps = {
  className?: string;
};

export const ConversationListCard = async ({
  className,
}: TConversationListCardProps) => {
  const selectedProject = await getSelectProject();
  if (!selectedProject) return null;

  return (
    <Card className={className}>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Last conversations</h2>
      </CardHeader>
      <Separator />
      <CardContent className="h-[153px] w-full">
        <ConversationList
          selectedConversationId={selectedProject.id}
          className="pt-2"
          slice={2}
        />
      </CardContent>
      <Separator />
      <CardFooter className="group flex justify-center divide-y p-4">
        <Link href="/messages" className="flex items-center gap-2">
          <p className="text-primary font-semibold">View Conversations</p>
          <ArrowRight
            size={20}
            className="text-primary transition-transform delay-75 group-hover:translate-x-1"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};
