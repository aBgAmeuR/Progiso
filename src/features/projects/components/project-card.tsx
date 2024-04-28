import { TProject } from '../types';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type TProjectCardProps = {
  project: TProject;
  variant?: 'grid' | 'list';
};

export const ProjectCard = ({
  project,
  variant = 'grid',
}: TProjectCardProps) => {
  return (
    <Card
      key={project.id}
      className={cn(
        'prose dark:prose-invert lg:prose-xl text-foreground hover:border-primary',
        variant === 'list' && 'grid grid-cols-3'
      )}
    >
      <CardHeader className="flex h-20 flex-row items-center gap-2 p-4">
        <Avatar className="border-border border">
          <AvatarImage src={project.image_url!} />
          <AvatarFallback>{project.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>
            {project.website_url?.split('https://')[1].split('/')[0]}
          </CardDescription>
        </div>
      </CardHeader>
      {variant === 'grid' ? (
        <CardContent className="h-12 p-4 pt-0">
          {project.github_url ? (
            <div className="bg-secondary flex w-min flex-row items-center gap-2 rounded-xl px-3 py-1">
              <Icons.github className="size-4" />
              <p>{project.github_url.split('https://github.com/')[1]}</p>
            </div>
          ) : null}
        </CardContent>
      ) : null}
      <CardFooter className={cn('p-4 pt-0', variant === 'list' && 'p-0')}>
        <p className="text-muted-foreground text-sm">
          Last updated: {project.updated_at.toString()}
        </p>
      </CardFooter>
    </Card>
  );
};
