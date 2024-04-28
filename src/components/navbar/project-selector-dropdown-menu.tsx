import { ChevronsUpDown } from 'lucide-react';

import { ProjectSelectorDropdownContent } from './project-selector-dropdown-content';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getProjects } from '@/features/projects';

export const ProjectSelectorDropdownMenu = async () => {
  const projects = await getProjects();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-primary/10 rounded px-0.5 py-2">
        <ChevronsUpDown size={16} strokeWidth={1} />
      </DropdownMenuTrigger>
      <ProjectSelectorDropdownContent projects={projects || []} />
    </DropdownMenu>
  );
};
