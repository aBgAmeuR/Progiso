'use client';

import { useState } from 'react';
import { CirclePlus, LayoutGrid, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Input } from '../ui/input';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TProject } from '@/features/projects/types';

type TProjectSelectorDropdownContentProps = {
  projects: Array<TProject>;
};

export const ProjectSelectorDropdownContent = ({
  projects,
}: TProjectSelectorDropdownContentProps) => {
  const [search, setSearch] = useState<string>('');
  const { update } = useSession();
  const router = useRouter();

  const filteredProjects = projects.filter((project) => {
    return project.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleSelectProject = async (project: TProject) => {
    await update({
      user: {
        selectProject: project,
      },
    });
    router.refresh();
  };

  return (
    <DropdownMenuContent className="w-64">
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
      <ScrollArea className="max-h-32 w-full overflow-y-scroll">
        {filteredProjects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            className="flex w-[246px] cursor-pointer gap-2"
            onClick={() => handleSelectProject(project)}
          >
            <Image
              src={project.image_url}
              alt={project.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="truncate">{project.name}</p>
          </DropdownMenuItem>
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex cursor-pointer gap-2" asChild>
        <Link href="/projects">
          <LayoutGrid size={16} strokeWidth={1} className="text-green-500" />
          <p>View All Projects</p>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="flex cursor-pointer gap-2" asChild>
        <Link href="/projects/new">
          <CirclePlus size={16} strokeWidth={1} className="text-blue-500" />
          <p>Create Project</p>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
