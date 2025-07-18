import { useMemo, useState, createContext } from 'react';

export type SearchContextProps = {
  search: string;
  setSearch: (value: string) => void;
};

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');

  const value = useMemo(() => ({ search, setSearch }), [search, setSearch]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
