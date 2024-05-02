'use client';

import { useState } from 'react';

import { DEFAULT_CARDS } from '../types';
import { BurnBarrel } from './burn-barrel';
import { Column } from './tasks-colums';

export const TasksBoard = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex size-full gap-3 overflow-scroll">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-600 dark:text-neutral-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-600 dark:text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-600 dark:text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-600 dark:text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};
