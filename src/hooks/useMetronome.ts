import { useContext } from "react";
import { metronomeContext } from "../components/Metronome/MetronomeProvider";


export const useMetronome = () => {
    const context = useContext(metronomeContext);
    if (!context) {
      throw new Error("useMetronome must be used within a MetronomeProvider");
    }
    return context;
  };