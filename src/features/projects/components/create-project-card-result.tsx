'use client';

import { parseAsJson, useQueryState } from 'nuqs';

import { formSchema } from '.';
import { ProjectCard } from './project-card';

export const CreateProjectCardResult = () => {
  const [formValues] = useQueryState('zod', parseAsJson(formSchema.parse));

  const project = {
    id: formValues?.name as string,
    name: formValues?.name || 'New Project',
    description: formValues?.description as string,
    website_url: formValues?.website_url as string,
    image_url: formValues?.image_url as string,
    github_url: formValues?.github_url as string,
    created_at: new Date(),
    updated_at: new Date(),
  };

  return <ProjectCard project={project} />;
};
