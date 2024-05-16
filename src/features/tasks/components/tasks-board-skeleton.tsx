import { PropsWithChildren } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const TasksBoardSkeleton = () => {
  return (
    <div className="flex gap-3">
      <Column>
        <Tasks nbLigne="2" />
        <Tasks nbLigne="1" />
        <Tasks nbLigne="1" />
        <Tasks nbLigne="2" />
      </Column>
      <Column>
        <Tasks nbLigne="1" />
      </Column>
      <Column>
        <Tasks nbLigne="2" />
        <Tasks nbLigne="1" />
        <Tasks nbLigne="2" />
      </Column>
      <Column>
        <Tasks nbLigne="2" />
        <Tasks nbLigne="2" />
      </Column>
    </div>
  );
};

const Column = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-56">
      <Skeleton className="mb-3 h-6 w-full" />
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

type TTasksProps = {
  nbLigne?: '1' | '2';
};

const Tasks = ({ nbLigne = '1' }: TTasksProps) => {
  return (
    <Skeleton
      className={cn('w-56', nbLigne === '1' ? 'h-[74px]' : 'h-[94px]')}
    />
  );
};
