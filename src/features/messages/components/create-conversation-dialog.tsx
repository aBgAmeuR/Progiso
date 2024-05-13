'use client';

import React from 'react';
import { MessageCirclePlus } from 'lucide-react';

import { CreateConversationForm } from './create-conversation-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const CreateConversationDialog = () => {
  const [showDialog, setDialog] = React.useState(false);

  return (
    <Dialog open={showDialog} onOpenChange={setDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialog(true)} variant="ghost" size="icon">
          <MessageCirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new conversation</DialogTitle>
          <DialogDescription>
            Add members to the conversation to start chatting.
          </DialogDescription>
        </DialogHeader>
        <CreateConversationForm closeDialog={setDialog} />
      </DialogContent>
    </Dialog>
  );
};
