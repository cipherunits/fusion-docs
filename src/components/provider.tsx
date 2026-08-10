'use client';

import type { ComponentProps, ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import SearchDialog from '@/components/search';

type RootProviderProps = ComponentProps<typeof RootProvider>;

/**
 * next-themes injects an inline theme script (needed for zero-flash SSR).
 * React 19 warns about executable <script> tags inside client components.
 * Keep a real script on the server; on the client mark it as a data block so
 * React skips the warning (theme is already applied from SSR HTML).
 * @see https://github.com/pacocoursey/next-themes/issues/385
 */
const themeScriptProps =
  typeof window === 'undefined'
    ? undefined
    : ({ type: 'application/json' } as const);

export function Provider({
  children,
  ...props
}: { children: ReactNode } & Omit<RootProviderProps, 'children'>) {
  return (
    <RootProvider
      {...props}
      theme={{
        attribute: 'class',
        defaultTheme: 'system',
        enableSystem: true,
        disableTransitionOnChange: true,
        ...props.theme,
        scriptProps: {
          ...props.theme?.scriptProps,
          ...themeScriptProps,
        },
      }}
      search={{
        ...props.search,
        SearchDialog,
      }}
    >
      {children}
    </RootProvider>
  );
}
