'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { createProjectAction } from '@/features/projects';

export const formSchema = z.object({
  name: z.string().min(3).max(128),
  description: z.string().max(255).optional(),
  website_url: z.string().url().max(1024).optional(),
  image_url: z.string().url().max(1024).optional(),
  github_url: z.string().url().max(1024).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateProjectForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setFormValues] = useQueryState(
    'zod',
    parseAsJson(formSchema.parse)
  );

  const onSubmit = async (project: FormSchema) => {
    const res = await createProjectAction(project);
    if (!res) return;
    toast({ description: res.message });
    router.push('/projects');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={async () => await setFormValues(form.getValues())}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="relative">
                Project name
                <Star
                  fill="red"
                  color="red"
                  className="absolute -right-2.5 top-0.5 size-2 -rotate-12"
                />
              </FormLabel>
              <FormControl>
                <Input placeholder="Project name" {...field} />
              </FormControl>
              {/**<FormDescription>
                This is your public display name.
                </FormDescription>*/}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project description</FormLabel>
              <FormControl>
                <Input placeholder="Project description" {...field} />
              </FormControl>
              {/**<FormDescription>
                This is your public display name.
                </FormDescription>*/}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Url</FormLabel>
              <FormControl>
                <Input placeholder="Website Url" {...field} />
              </FormControl>
              {/**<FormDescription>
                This is your public display name.
                </FormDescription>*/}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Url</FormLabel>
              <FormControl>
                <Input placeholder="Image Url" {...field} />
              </FormControl>
              {/**<FormDescription>
                This is your public display name.
                </FormDescription>*/}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Github Url</FormLabel>
              <FormControl>
                <Input placeholder="Github Url" {...field} />
              </FormControl>
              {/**<FormDescription>
                This is your public display name.
                </FormDescription>*/}
            </FormItem>
          )}
        />
        <Button type="submit">Create Project</Button>
      </form>
    </Form>
  );
};
