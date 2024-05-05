import { useState } from 'react';

import { ICard, IColumn } from '@/features/tasks/types';

type UseTasksColumnProps = {
  column: IColumn;
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
};

export const useTasksColumn = ({
  column,
  cards,
  setCards,
}: UseTasksColumnProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: ICard) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData('cardId');

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = (element as HTMLElement).dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column: column.id };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === '-1';

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els: Element[] | null = null) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      (i as HTMLElement).style.opacity = '0';
    });
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    (el.element as HTMLElement).style.opacity = '1';
  };

  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: Element[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(`[data-column="${column.id}"]`)
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column.id);

  return {
    active,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    filteredCards,
  };
};
