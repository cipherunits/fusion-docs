import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { VersionSelect } from '@/components/docs/version-select';
import { flattenVersionedPageTree } from '@/lib/docs-page-tree';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;

  return (
    <DocsLayout
      {...baseOptions(lang)}
      links={[]}
      tree={flattenVersionedPageTree(source.getPageTree(lang), slug)}
      sidebar={{
        banner: <VersionSelect />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
