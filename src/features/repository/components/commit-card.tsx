import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { TCommit } from '../type';
import { getTimeAgo } from '../utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';

const commitStates = {
  SUCCESS: {
    className: 'bg-green-500',
    text: 'Success',
  },
  FAILURE: {
    className: 'bg-red-500',
    text: 'Failure',
  },
} as const;

type TCommitCardProps = {
  commit: TCommit;
};

export const CommitCard = async ({ commit }: TCommitCardProps) => {
  const commitState = commit.node.status?.state;

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-1 flex-col gap-1">
        <p className="line-clamp-1">{commit.node.message}</p>
        <div className="grid grid-cols-[1fr_minmax(100px,_1fr)] gap-3">
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground whitespace-nowrap">{`${getTimeAgo(commit.node.committedDate)} by ${commit.node.author.name}`}</p>
            <UserAvatar
              url={commit.node.author.avatarUrl}
              className="size-6"
              seed={commit.node.author.name}
            />
          </div>
          <div className="flex items-center gap-1">
            <div
              className={cn(
                'size-2 rounded-full',
                commitStates[commitState!].className
              )}
            ></div>
            <p className="text-muted-foreground">
              {commitStates[commitState!].text}
            </p>
          </div>
        </div>
      </div>
      <Button variant="link" size="icon" className="hover:bg-secondary" asChild>
        <Link href={commit.node.commitUrl} target="_blank">
          <ExternalLink className="size-5" />
        </Link>
      </Button>
    </div>
  );
};

export const CommitCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className="h-6 w-3/4" />
        <div className="grid grid-cols-[1fr_minmax(100px,_1fr)] gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="size-6 rounded-full" />
          </div>
        </div>
      </div>
      <Button
        variant="link"
        size="icon"
        className="hover:bg-secondary"
        disabled
      >
        <ExternalLink className="size-5" />
      </Button>
    </div>
  );
};
