import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { VersionSelect } from '@/components/docs/version-select';
import { flattenVersionedPageTree } from '@/lib/docs-page-tree';
import { getVersionsFromTree } from '@/lib/docs';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;
  const tree = source.getPageTree(lang);
  const versions = getVersionsFromTree(tree, slug?.[0]);

  return (
    <DocsLayout
      {...baseOptions(lang)}
      links={[]}
      tree={flattenVersionedPageTree(tree, slug, lang)}
      sidebar={{
        banner: <VersionSelect versions={versions} />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
