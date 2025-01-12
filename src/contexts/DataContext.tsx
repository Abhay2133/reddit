"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the type for the data
export interface Data {
  data: {
    title: string;
    name: string;
    thumbnail: string;
    num_comments: number;
    wls: number;
    ups: number;
  };
}

// Define the type for our context
interface DataContextType {
  data: Data[];
  setData: Dispatch<SetStateAction<Data[]>>;
  showSearchResult: boolean;
  setShowSearchResult: Dispatch<SetStateAction<boolean>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  isLoadingSearching: boolean;
  setIsLoadingSearching: Dispatch<SetStateAction<boolean>>;
}

// Create the DataContext with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoadingSearching, setIsLoadingSearching] = useState(true);
  
  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        showSearchResult,
        setShowSearchResult,
        query,
        setQuery,
        isLoadingSearching,
        setIsLoadingSearching,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook to use the DataContext
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
