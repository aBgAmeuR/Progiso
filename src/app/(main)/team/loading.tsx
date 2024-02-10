import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from '@tremor/react';

export default function Loading() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}