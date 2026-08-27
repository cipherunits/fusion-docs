import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { VersionSelect } from '@/components/docs/version-select';
import { flattenVersionedPageTree } from '@/lib/docs-page-tree';
import { getVersionsFromTree } from '@/lib/docs';
import { getCommon } from '@/lib/common-messages';
import { siteConfig } from '@/lib/seo';

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
  const common = getCommon(lang);

  return (
    <DocsLayout
      {...baseOptions(lang)}
      links={[
        {
          text: common.app,
          url: `/${lang}/gui`,
          active: 'nested-url',
        },
        {
          text: common.navDevelopers,
          url: siteConfig.org.url,
          active: 'url',
          external: true,
        },
      ]}
      tree={flattenVersionedPageTree(tree, slug, lang)}
      sidebar={{
        banner: <VersionSelect versions={versions} />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
