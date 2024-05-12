'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  createConversationAction,
  getMembersListofProjectAction,
} from '../actions';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultiSelectFormField from '@/components/ui/multi-select';
import { getErrorMessage } from '@/lib/handle-error';

export const formSchema = z.object({
  title: z.string().max(128).optional(),
  members: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Add at least one member.'),
});

type FormSchema = z.infer<typeof formSchema>;

type TCreateConversationFormProps = {
  closeDialog: (value: boolean) => void;
};

export const CreateConversationForm = ({
  closeDialog,
}: TCreateConversationFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      members: [],
    },
  });
  const [membersSelectedLength, setMembersSelectedLength] = React.useState(0);
  const { data, isError, isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await getMembersListofProjectAction(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const membersList: Array<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }> = data
    ? data.map((member) => {
        const IconComponent: React.FC<{ className?: string }> = () => (
          <Avatar className="mr-2 size-4">
            <AvatarImage src={member.image!} />
            <AvatarFallback>
              {member.label && member.label.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        );

        return {
          label: member.label || 'Unknown',
          value: member.value || 'Unknown',
          icon: IconComponent,
        };
      })
    : [];

  const onSubmit = async (project: FormSchema) => {
    toast.promise(createConversationAction(project), {
      loading: 'Creating conversation...',
      success: 'Conversation created successfully!',
      error: (err: unknown) => getErrorMessage(err),
    });

    closeDialog(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="members"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Members</FormLabel>
              <FormControl>
                <MultiSelectFormField
                  options={membersList || []}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select members"
                  variant="inverted"
                  setSelectValuesLength={setMembersSelectedLength}
                />
              </FormControl>
              <FormDescription>
                Add members to the conversation to start chatting.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className={membersSelectedLength < 2 ? 'hidden' : ''}>
              <FormLabel>Conversation Title</FormLabel>
              <FormControl>
                <Input placeholder="Project name" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of the conversation.
              </FormDescription>
            </FormItem>
          )}
        />
        <DialogFooter className="mt-2 gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create Conversation</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
