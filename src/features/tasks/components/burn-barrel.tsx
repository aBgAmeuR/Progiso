import { useState } from 'react';
import { Flame, Trash } from 'lucide-react';

import { useKanbanContext } from './kanban';

export const BurnBarrel = () => {
  const [active, setActive] = useState(false);
  const { deleteCardMutation } = useKanbanContext();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData('cardId');
    deleteCardMutation.mutate(cardId);

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid size-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-border bg-card/20 text-secondary'
      }`}
    >
      {active ? (
        <Flame className="animate-bounce" />
      ) : (
        <Trash className="text-foreground" />
      )}
    </div>
  );
};
