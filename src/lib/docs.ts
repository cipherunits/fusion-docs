export const docProducts = [
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'TypeScript SDK documentation',
    icon: 'FileType',
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Python SDK documentation',
    icon: 'CodeXml',
  },
  {
    id: 'csharp',
    title: 'C#',
    description: 'C# SDK documentation',
    icon: 'Braces',
  },
] as const;

export type DocProductId = (typeof docProducts)[number]['id'];

/** Available versions per product — add new versions here and under content/docs/{product}/{version}/ */
export const docVersions: Record<DocProductId, readonly string[]> = {
  typescript: ['v1'],
  python: ['v1'],
  csharp: ['v1'],
};

export const latestVersion: Record<DocProductId, string> = {
  typescript: 'v1',
  python: 'v1',
  csharp: 'v1',
};

export function isDocProductId(value: string): value is DocProductId {
  return docProducts.some((product) => product.id === value);
}

export function getDocHref(
  lang: string,
  product: DocProductId,
  version: string = latestVersion[product],
  slug: string[] = [],
) {
  const parts = [lang, 'docs', product, version, ...slug].filter(Boolean);
  return `/${parts.join('/')}`;
}

/** Parse `/docs/{product}/{version}/...` from a docs slug */
export function parseDocsSlug(slug?: string[]) {
  if (!slug || slug.length === 0) {
    return null;
  }

  const [product, version, ...rest] = slug;
  if (!product || !version || !isDocProductId(product)) {
    return null;
  }
  if (!docVersions[product].includes(version)) {
    return null;
  }

  return { product, version, rest };
}
