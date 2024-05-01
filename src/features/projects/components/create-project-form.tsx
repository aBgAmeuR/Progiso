'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProjectAction } from '@/features/projects';
import { getErrorMessage } from '@/lib/handle-error';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(3).max(128),
  description: z.string().max(255).optional(),
  website_url: z.string().url().optional(),
  image_url: z.string().url().optional(),
  github_url: z.string().url().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateProjectForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (project: FormSchema) => {
    toast.promise(createProjectAction(project), {
      loading: 'Creating project...',
      success: 'Project created successfully',
      error: (err: unknown) => getErrorMessage(err),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project name"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.name && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project description"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.description && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project website url"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.website_url && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project image url"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.image_url && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project github url"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.github_url && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
