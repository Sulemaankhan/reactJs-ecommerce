import React, { createContext, useContext, useState, useMemo } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [term, setTerm] = useState("");

  const value = useMemo(
    () => ({
      term,
      setTerm,
      clear: () => setTerm(""),
    }),
    [term]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used inside SearchProvider");
  }
  return ctx;
}

