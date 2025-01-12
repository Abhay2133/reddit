import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the data
interface Data {
  id: number;
  name: string;
}

// Define the type for our context
interface DataContextType {
  data: Data[];
  addItem: (item: Data) => void;
  removeItem: (id: number) => void;
}

// Create the DataContext with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data[]>([]);

  const addItem = (item: Data) => {
    setData((prevData) => [...prevData, item]);
  };

  const removeItem = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <DataContext.Provider value={{ data, addItem, removeItem }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook to use the DataContext
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
