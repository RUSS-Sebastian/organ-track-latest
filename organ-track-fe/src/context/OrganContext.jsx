import { createContext, useContext, useState } from "react";

const OrganContext = createContext();

export function OrganProvider({ children }) {
  const [organ, setOrgan] = useState(null);

  return (
    <OrganContext.Provider value={{ organ, setOrgan }}>
      {children}
    </OrganContext.Provider>
  );
}

export function useOrgan() {
  return useContext(OrganContext);
}
