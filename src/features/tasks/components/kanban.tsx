import React, { createContext, PropsWithChildren, useContext } from 'react';

import { UseTasksMutation } from '@/hooks/use-tasks-mutation';

type ColumnContextType = ReturnType<typeof UseTasksMutation>;

const ColumnContext = createContext<ColumnContextType['mutation'] | undefined>(
  undefined
);

export const useKanbanContext = () => {
  const context = useContext(ColumnContext);
  if (!context) {
    throw new Error('useKanbanContext must be used within a KanbanProvider');
  }
  return context;
};

export const KanbanProvider: React.FC<PropsWithChildren<ColumnContextType>> = (
  props
) => {
  return (
    <ColumnContext.Provider value={props.mutation}>
      {props.children}
    </ColumnContext.Provider>
  );
};
