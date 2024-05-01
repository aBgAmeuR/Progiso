'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getTagsAction } from '../actions';
import { CreateTaskForm } from './create-task-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const CreateTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const {
  //   data: tags,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['tags'],
  //   queryFn: async () => await getTagsAction(),
  // });

  // if (isLoading) return <Button disabled>Create Task</Button>;
  // if (isError) return <div>Error</div>;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>
            <CreateTaskForm setIsOpen={setIsOpen} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
