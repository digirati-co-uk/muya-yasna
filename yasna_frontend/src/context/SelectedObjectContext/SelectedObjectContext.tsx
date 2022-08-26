import { createContext, ReactNode, useState } from 'react';
import { YasnaObject } from '../../typings/ObjectTracking';

type SelectedObjectId = YasnaObject['id'] | null;

type SelectedObjectContextType = {
  selectedObjectId: SelectedObjectId;
  setSelectedObjectId: (selectedObjectId: SelectedObjectId) => void;
};
const initialState: SelectedObjectContextType = {
  selectedObjectId: null,
  setSelectedObjectId: () => null,
};

export const SelectedObjectContext = createContext<SelectedObjectContextType>(initialState);

export type SelectedObjectProviderProps = {
  children: ReactNode;
};

export function SelectedObjectProvider({ children }: SelectedObjectProviderProps) {
  const [selectedObjectId, setSelectedObjectId] = useState<SelectedObjectId>(null);

  return (
    <SelectedObjectContext.Provider value={{ selectedObjectId, setSelectedObjectId }}>
      {children}
    </SelectedObjectContext.Provider>
  );
}
