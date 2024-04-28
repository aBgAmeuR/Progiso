'use server';

import { revalidateTag } from 'next/cache';

import { createProject, getProjects } from './services';
import { TCreateProject } from './types';

export const createProjectAction = async (project: TCreateProject) => {
  const res = await createProject(project);

  if (!res) return null;

  revalidateTag('projects');
  return { message: 'Project created successfully' };
};

export const getProjectsAction = async () => {
  const res = await getProjects();

  if (!res) return null;

  return res;
};
