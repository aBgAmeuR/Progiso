import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const MembersTableSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-64" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(4)].map((e, i) => (
            <MemberTableRowSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const MemberTableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="size-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-[22px] w-10" />
      </TableCell>
      <TableCell>
        <Button variant="ghost" className="flex size-8 p-0" disabled>
          <DotsHorizontalIcon className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
