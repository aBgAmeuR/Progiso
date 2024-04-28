import { getProjects } from '../services';
import { FilterProjectsList } from './filter-projects-list';

export const ProjectsList = async () => {
  const project = await getProjects();

  if (!project) return null;

  return <FilterProjectsList projects={project} />;
};
