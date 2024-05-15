import { PropsWithChildren } from 'react';
import { ArrowRight } from 'lucide-react';

import { Card, CardFooter, CardHeader } from './ui/card';
import { Separator } from './ui/separator';

import { cn } from '@/lib/utils';

type TBoardCardSkeletonProps = PropsWithChildren<{
  headerText?: string;
  footerText?: string;
  className?: string;
}>;

export const BoardCardSkeleton = ({
  className,
  headerText,
  footerText,
  children,
}: TBoardCardSkeletonProps) => {
  return (
    <Card className={cn('h-full', className)}>
      {headerText ? (
        <CardHeader className="bg-muted/20 p-4">
          <h2 className="text-lg font-semibold">{headerText}</h2>
        </CardHeader>
      ) : null}
      <Separator />
      {children}
      <Separator />
      {footerText ? (
        <CardFooter className="group flex justify-center divide-y p-4">
          <div className="flex items-center gap-2">
            <p className="text-primary font-semibold">{footerText}</p>
            <ArrowRight
              size={20}
              className="text-primary transition-transform delay-75 group-hover:translate-x-1"
            />
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};
