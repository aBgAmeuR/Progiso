import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Icons } from './icons';
import { Separator } from './ui/separator';

export function Announcement() {
  return (
    <Link
      href="/repo"
      className="bg-muted inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium"
    >
      <Icons.github className="size-4" />{' '}
      <Separator className="mx-2 h-4" orientation="vertical" />{' '}
      <span>Introducing Repo Stats</span>
      <ArrowRightIcon className="ml-1 size-4" />
    </Link>
  );
}
