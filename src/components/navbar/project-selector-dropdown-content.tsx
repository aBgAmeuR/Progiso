'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { CirclePlus, Search } from 'lucide-react';

import { Input } from '../ui/input';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TProject } from '@/features/projects/types';

type TProjectSelectorDropdownContentProps = {
  projects: Array<TProject>;
};

export const ProjectSelectorDropdownContent = ({
  projects,
}: TProjectSelectorDropdownContentProps) => {
  const [search, setSearch] = useState<string>('');

  const filteredProjects = projects.filter((project) => {
    return project.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <DropdownMenuContent>
      <div className="relative w-full">
        <Input
          className="pl-8"
          placeholder="Find Project..."
          variant="outline"
          value={search}
          sizes="sm"
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <Search className="text-muted-foreground absolute left-0 top-0 m-2.5 size-4" />
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuLabel className="text-muted-foreground text-xs">
        Projects
      </DropdownMenuLabel>
      <ScrollArea className="max-h-48">
        {filteredProjects.map((project) => (
          <DropdownMenuItem key={project.id} className="flex gap-2">
            <img
              src={project.image_url}
              alt={project.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            {project.name}
          </DropdownMenuItem>
        ))}
      </ScrollArea>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex gap-2">
        <CirclePlus size={16} strokeWidth={1} className="text-blue-500" />
        <p>Create Project</p>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
