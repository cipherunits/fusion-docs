import type { ReactNode } from 'react';
import type { Folder, Node, Root } from 'fumadocs-core/page-tree';
import { source } from '@/lib/source';
import { i18n } from '@/lib/i18n';

export type DocProduct = {
  id: string;
  title: string;
  versions: string[];
  /** Preferred version — first entry in that product's `meta.json` pages list. */
  latestVersion: string;
};

function isFolder(node: Node): node is Folder {
  return node.type === 'folder';
}

export function folderSegment(folder: Folder): string {
  const path = folder.$ref?.folder ?? '';
  return path.slice(path.lastIndexOf('/') + 1);
}

function nodeTitle(node: { name: ReactNode }): string {
  return typeof node.name === 'string' ? node.name : String(node.name ?? '');
}

function productFolders(tree: Root): Folder[] {
  return tree.children.filter(
    (node): node is Folder => isFolder(node) && Boolean(node.root),
  );
}

function versionsOf(product: Folder): string[] {
  return product.children
    .filter(isFolder)
    .map((folder) => folderSegment(folder));
}

/** SDK products for a locale — discovered from `content/docs/{locale}` page tree. */
export function getDocProducts(
  locale: string = i18n.defaultLanguage,
): DocProduct[] {
  const tree = source.getPageTree(locale);

  return productFolders(tree).map((folder) => {
    const versions = versionsOf(folder);
    return {
      id: folderSegment(folder),
      title: nodeTitle(folder) || folderSegment(folder),
      versions,
      latestVersion: versions[0] ?? '',
    };
  });
}

export function getDocProduct(
  productId: string,
  locale: string = i18n.defaultLanguage,
): DocProduct | undefined {
  return getDocProducts(locale).find((product) => product.id === productId);
}

export function getProductVersions(
  productId: string,
  locale: string = i18n.defaultLanguage,
): string[] {
  return getDocProduct(productId, locale)?.versions ?? [];
}

export function getLatestVersion(
  productId: string,
  locale: string = i18n.defaultLanguage,
): string | undefined {
  return getDocProduct(productId, locale)?.latestVersion;
}

export function isDocProductId(
  value: string,
  locale: string = i18n.defaultLanguage,
): boolean {
  return getDocProducts(locale).some((product) => product.id === value);
}

export function getDocHref(
  lang: string,
  product: string,
  version?: string,
  slug: string[] = [],
) {
  const resolvedVersion =
    version ?? getLatestVersion(product, lang) ?? getLatestVersion(product);
  const parts = [lang, 'docs', product, resolvedVersion, ...slug].filter(
    Boolean,
  );
  return `/${parts.join('/')}`;
}

/** First product’s latest docs URL for a locale (docs index redirect). */
export function getDefaultDocHref(lang: string): string | null {
  const [first] = getDocProducts(lang);
  if (!first?.latestVersion) {
    return null;
  }
  return getDocHref(lang, first.id, first.latestVersion);
}

/** Parse `/docs/{product}/{version}/...` using the locale’s content tree. */
export function parseDocsSlug(slug?: string[], locale?: string) {
  if (!slug || slug.length === 0) {
    return null;
  }

  const [product, version, ...rest] = slug;
  if (!product || !version) {
    return null;
  }

  const catalog = getDocProduct(product, locale ?? i18n.defaultLanguage);
  if (!catalog || !catalog.versions.includes(version)) {
    return null;
  }

  return { product, version, rest };
}

export function getVersionsFromTree(
  tree: Root,
  productId?: string,
): string[] {
  if (!productId) {
    return [];
  }

  const product = productFolders(tree).find(
    (folder) => folderSegment(folder) === productId,
  );
  return product ? versionsOf(product) : [];
}
