import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FlavorId, FlavorInfo } from '../types';
import { FLAVORS } from '../data/flavorData';

interface FlavorContextType {
  currentFlavor: FlavorInfo;
  selectedFlavorId: FlavorId;
  setFlavor: (id: FlavorId) => void;
  isUnwrapped: boolean;
  setIsUnwrapped: React.Dispatch<React.SetStateAction<boolean>>;
  autoRotate: boolean;
  setAutoRotate: React.Dispatch<React.SetStateAction<boolean>>;
  interactiveRotation: [number, number];
  setInteractiveRotation: (rot: [number, number]) => void;
}

const FlavorContext = createContext<FlavorContextType | undefined>(undefined);

export const FlavorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFlavorId, setSelectedFlavorId] = useState<FlavorId>('chocolate-fudge');
  const [isUnwrapped, setIsUnwrapped] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [interactiveRotation, setInteractiveRotation] = useState<[number, number]>([0, 0]);

  const currentFlavor = FLAVORS[selectedFlavorId] || FLAVORS['chocolate-fudge'];

  // Dynamically update CSS custom properties on the root element
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', currentFlavor.accentColor);
    root.style.setProperty('--accent-secondary', currentFlavor.accentSecondary);
    root.style.setProperty('--accent-glow', currentFlavor.accentGlow);
  }, [currentFlavor]);

  const setFlavor = (id: FlavorId) => {
    if (FLAVORS[id]) {
      setSelectedFlavorId(id);
    }
  };

  return (
    <FlavorContext.Provider
      value={{
        currentFlavor,
        selectedFlavorId,
        setFlavor,
        isUnwrapped,
        setIsUnwrapped,
        autoRotate,
        setAutoRotate,
        interactiveRotation,
        setInteractiveRotation,
      }}
    >
      {children}
    </FlavorContext.Provider>
  );
};

export const useFlavor = (): FlavorContextType => {
  const context = useContext(FlavorContext);
  if (!context) {
    throw new Error('useFlavor must be used within a FlavorProvider');
  }
  return context;
};
