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

type TCommitSectionProps = {
  nbCommits?: number;
};

export const CommitsSection = async ({
  nbCommits = 5,
}: TCommitSectionProps) => {
  const commitsStats = await getCommitsStats();
  if (!commitsStats) return null;

  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Last Commits</h2>
      </CardHeader>
      <Separator />
      <CardContent className="divide-y p-0">
        {commitsStats.slice(0, nbCommits).map((commit: TCommit) => (
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

type TCommitSectionSkeletonProps = {
  nbCommits?: number;
};

export const CommitsSectionSkeleton = ({
  nbCommits = 5,
}: TCommitSectionSkeletonProps) => {
  return (
    <Card>
      <CardHeader className="bg-muted/20 p-4">
        <h2 className="text-lg font-semibold">Last Commits</h2>
      </CardHeader>
      <Separator />
      <CardContent className="divide-y p-0"></CardContent>
      {[...Array(nbCommits)].map((e, i) => (
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
