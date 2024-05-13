'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { deleteConversationAction } from '../actions';

import { Button } from '@/components/ui/button';

type TDeleteConversationBtnProps = {
  conversationId: string;
};

export const DeleteConversationBtn = ({
  conversationId,
}: TDeleteConversationBtnProps) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleDelete = async () => {
    if (isConfirming && !disabled) {
      toast.promise(deleteConversationAction(conversationId), {
        loading: 'Deleting conversation...',
        success: 'Conversation deleted',
        error: 'Error deleting conversation',
      });
    } else {
      setIsConfirming(true);
      setDisabled(true);

      setTimeout(() => setDisabled(false), 300);
      setTimeout(() => setIsConfirming(false), 3000);
    }
  };

  return (
    <Button
      variant={isConfirming ? 'destructive' : 'secondary'}
      size="icon"
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
};
