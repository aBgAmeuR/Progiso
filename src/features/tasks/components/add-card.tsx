import { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

import { INewCard, ITag } from '../types';
import { TagSelector } from './tag-selector';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type TAddCardProps = {
  column: string;
  createCardMutation: UseMutationResult<void, Error, INewCard, unknown>;
};

export const AddCard = ({ column, createCardMutation }: TAddCardProps) => {
  const [text, setText] = useState('');
  const [tag, setTag] = useState<ITag | null>(null);
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      tag,
    };

    createCardMutation.mutate(newCard);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <Textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full text-sm"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <div>
              <TagSelector currentTag={tag} setTag={setTag} />
            </div>
            <div className="flex gap-1.5">
              <Button
                onClick={() => setAdding(false)}
                size="sm"
                variant="ghost"
                className="px-3 py-1.5 transition-colors"
              >
                Close
              </Button>
              <Button
                type="submit"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <span>Add</span>
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs transition-colors "
        >
          <span>Add card</span>
          <Plus className="size-4" />
        </motion.button>
      )}
    </>
  );
};
