'use client';

import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppContextProvider({ children }) {
  const [appState, setAppState] = useState({});

  const value = useMemo(
    () => ({
      appState,
      setAppState,
    }),
    [appState]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
}
