import { FC, createContext, useContext, useState, useEffect } from "react";

interface IMetronomeContextProps {
    bpm: number
}

const MetronomeContext = createContext<any>({} as unknown as IMetronomeContextProps);

export const MetronomeProvider: FC <IMetronomeContextProps> = (props) => {
    const { children } = props;
    return (
        <MetronomeContext.Provider>

        </MetronomeContext.Provider>
    )
}
