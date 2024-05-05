'use server';

import { createCard, getCards, getColumns } from './services';
import { ICard } from './types';

export const getColumnsAction = async () => {
  const columns = await getColumns();

  if (!columns) return null;

  return columns;
};

export const getCardsAction = async () => {
  const cards = await getCards();

  if (!cards) return null;

  return cards;
};

export const createCardAction = async (card: Omit<ICard, 'id'>) => {
  const res = await createCard(card);

  if (!res) return null;

  return res;
};
