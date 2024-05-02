import { motion } from 'framer-motion';

import { ICard } from '../types';
import { DropIndicator } from './drop-indicator';

type TCardProps = {
  title: string;
  id: string;
  column: string;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
};

export const Card = ({ title, id, column, handleDragStart }: TCardProps) => {
  const adaptedHandleDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent
  ) => {
    const dragEvent = event as unknown as React.DragEvent<HTMLDivElement>;
    handleDragStart(dragEvent, { title, id, column });
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={adaptedHandleDragStart}
        className="bg-card border-border cursor-grab rounded border p-3 active:cursor-grabbing"
      >
        <p className="text-sm">{title}</p>
      </motion.div>
    </>
  );
};
