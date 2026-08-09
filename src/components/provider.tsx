'use client';

import type { ComponentProps, ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import SearchDialog from '@/components/search';

type RootProviderProps = ComponentProps<typeof RootProvider>;

export function Provider({
  children,
  ...props
}: { children: ReactNode } & Omit<RootProviderProps, 'children'>) {
  return (
    <RootProvider
      {...props}
      search={{
        ...props.search,
        SearchDialog,
      }}
    >
      {children}
    </RootProvider>
  );
}
