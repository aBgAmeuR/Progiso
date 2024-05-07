'use server';

import {
  createCard,
  createColumn,
  deleteCard,
  deleteColumn,
  getCards,
  getColumns,
  switchColumns,
  updateCard,
  updateColumn,
} from './services';
import { ICard, IColumn, INewCard } from './types';

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

export const createCardAction = async (card: INewCard) => {
  const res = await createCard(card);

  if (!res) return null;

  return res;
};

export const updateCardAction = async (card: ICard) => {
  const res = await updateCard(card);

  if (!res) return null;

  return res;
};

export const deleteCardAction = async (id: string) => {
  const res = await deleteCard(id);

  if (!res) return null;

  return res;
};

export const createColumnAction = async (
  title: string,
  headingColor: string
) => {
  const res = await createColumn(title, headingColor);

  if (!res) return null;

  return res;
};

export const updateColumnAction = async (column: Omit<IColumn, 'order'>) => {
  const res = await updateColumn(column);

  if (!res) return null;

  return res;
};

export const deleteColumnAction = async (id: string) => {
  const res = await deleteColumn(id);

  if (!res) return null;

  return res;
};

export const switchColumnsAction = async (
  id: string,
  direction: 'left' | 'right'
) => {
  const res = await switchColumns(id, direction);

  if (!res) return null;

  return res;
};
