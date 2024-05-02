'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createTaskAction } from '@/features/tasksv1/actions';
import { getErrorMessage } from '@/lib/handle-error';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(3).max(128),
  content: z.string().max(255).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

type TCreateTaskFormProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export const CreateTaskForm = ({ setIsOpen }: TCreateTaskFormProps) => {
  const queryClient = useQueryClient();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (project: FormSchema) => {
    const res = toast.promise(
      createTaskAction({
        title: project.title,
        content: project.content,
        assigneeIds: [],
      }),
      {
        loading: 'Creating task...',
        success: 'Task created successfully',
        error: (err: unknown) => getErrorMessage(err),
      }
    );

    if (!res) return;
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project name"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.title && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Project description"
                  className={cn(
                    'md:w-96',
                    form.formState.errors.content && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">
          Create Task
        </Button>
      </form>
    </Form>
  );
};
