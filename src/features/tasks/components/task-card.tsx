import { motion } from 'framer-motion';

import { ICard, ITag } from '../types';
import { DropIndicator } from './drop-indicator';

import { Badge } from '@/components/ui/badge';

type TCardProps = {
  title: string;
  id: string;
  column: string;
  tag: ITag | null;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
};

export const Card = ({
  title,
  id,
  column,
  handleDragStart,
  tag,
}: TCardProps) => {
  const adaptedHandleDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent
  ) => {
    const dragEvent = event as unknown as React.DragEvent<HTMLDivElement>;
    handleDragStart(dragEvent, { title, id, column, tag });
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={adaptedHandleDragStart}
        className="bg-card border-border cursor-grab space-y-1 rounded border p-3 active:cursor-grabbing"
      >
        {tag ? (
          <Badge variant="default" className={tag.color}>
            {tag.name}
          </Badge>
        ) : null}
        <p className="text-sm">{title}</p>
      </motion.div>
    </>
  );
};
