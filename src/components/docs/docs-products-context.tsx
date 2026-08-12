'use client';

import {
  createContext,
  type ReactNode,
  useContext,
} from 'react';

export type SearchProductTag = {
  id: string;
  title: string;
};

const DocsProductsContext = createContext<SearchProductTag[]>([]);

export function DocsProductsProvider({
  products,
  children,
}: {
  products: SearchProductTag[];
  children: ReactNode;
}) {
  return (
    <DocsProductsContext.Provider value={products}>
      {children}
    </DocsProductsContext.Provider>
  );
}

export function useDocsProducts(): SearchProductTag[] {
  return useContext(DocsProductsContext);
}
