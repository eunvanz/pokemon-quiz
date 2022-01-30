import React from "react";
import api from ".";

export const ApiContext = React.createContext(api);

export interface ApiProviderProps {
  api: Partial<typeof api>;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ api, children }) => (
  // @ts-ignore
  <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
);
