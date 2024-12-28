import { FC, createContext, useContext, useState, ReactNode } from "react";

interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
}

const MetronomeContext = createContext<IMetronomeContext | undefined>(undefined);

export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [bpm, setBpm] = useState(120); 

  return (
    <MetronomeContext.Provider value={{ bpm, setBpm }}>
      {children}
    </MetronomeContext.Provider>
  );
};

export const useMetronome = () => {
  const context = useContext(MetronomeContext);
  if (!context) {
    throw new Error("useMetronome must be used within a MetronomeProvider");
  }
  return context;
};
