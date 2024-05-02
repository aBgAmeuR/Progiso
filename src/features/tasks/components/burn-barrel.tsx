import { useState } from 'react';
import { Flame, Trash } from 'lucide-react';

import { ICard } from '../types';

type TBurnBarrelProps = {
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
};

export const BurnBarrel = ({ setCards }: TBurnBarrelProps) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData('cardId');
    console.log('Card ID:', cardId);
    setCards((pv) => pv.filter((c) => c.id !== cardId));

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
