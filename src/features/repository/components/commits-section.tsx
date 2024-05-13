import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { TCommit } from '../type';
import { CommitCard, CommitCardSkeleton } from './commit-card';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getCommitsStats } from '@/lib/github';

export const CommitsSection = async () => {
  const commitsStats = await getCommitsStats();

  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Last Commits</h2>
      </CardHeader>
      <Separator />
      <CardContent className="divide-y p-0">
        {commitsStats.slice(0, 5).map((commit: TCommit) => (
          <CommitCard key={commit.node.abbreviatedOid} commit={commit} />
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="group flex justify-center divide-y p-4">
        <Link href="/repo/commits" className="flex items-center gap-2">
          <p className="text-primary font-semibold">View More Commits</p>
          <ArrowRight
            size={20}
            className="text-primary transition-transform delay-75 group-hover:translate-x-1"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

export const CommitsSectionSkeleton = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Last Commits</h2>
      </CardHeader>
      <Separator />
      <CardContent className="divide-y p-0"></CardContent>
      {[...Array(5)].map((e, i) => (
        <CommitCardSkeleton key={i} />
      ))}
      <Separator />
      <CardFooter className="group flex justify-center divide-y p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-48" />
        </div>
      </CardFooter>
    </Card>
  );
};
