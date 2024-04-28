'use client';

import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SearchProjectInput = () => {
  const [filter, setFilter] = useQueryState('q');
  const [view, setView] = useQueryState('view');
  const router = useRouter();

  return (
    <div className="grid grid-cols-[4fr,repeat(2,minmax(120px,1fr))] gap-2">
      <Input
        placeholder="Search project"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Select
        onValueChange={(value) => setView(value as string)}
        value={view || 'grid'}
      >
        <SelectTrigger>
          <SelectValue placeholder="View" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="list">List</SelectItem>
          <SelectItem value="grid">Grid</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => router.push('/projects/create')}>
        Create Project
      </Button>
    </div>
  );
};
