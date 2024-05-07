import { motion } from 'framer-motion';

import { ICard } from '../types';
import { DropIndicator } from './drop-indicator';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type TCardProps = {
  card: ICard;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: ICard) => void;
};

export const Card = ({ card, handleDragStart }: TCardProps) => {
  const adaptedHandleDragStart = (
    event: MouseEvent | TouchEvent | PointerEvent
  ) => {
    const dragEvent = event as unknown as React.DragEvent<HTMLDivElement>;
    handleDragStart(dragEvent, card);
  };

  return (
    <>
      <DropIndicator beforeId={card.id} column={card.column} />
      <motion.div
        layout
        layoutId={card.id}
        draggable="true"
        onDragStart={adaptedHandleDragStart}
        className="bg-card border-border cursor-grab space-y-1 rounded border p-3 active:cursor-grabbing"
      >
        <div className="flex items-center justify-between">
          {card.tag ? (
            <Badge variant="default" className={card.tag.color}>
              {card.tag.name}
            </Badge>
          ) : (
            <div></div>
          )}
          {card.assignees && card.assignees.image && card.assignees.name ? (
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="size-6">
                  <AvatarImage src={card.assignees.image} />
                  <AvatarFallback>{card.assignees.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{card.assignees.name}</p>
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
        <p className="text-sm">{card.title}</p>
      </motion.div>
    </>
  );
};
