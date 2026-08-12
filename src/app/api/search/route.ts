import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  buildIndex(page) {
    const product = page.slugs[0];
    const index = {
      title: page.data.title,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      ...(page.data.description ? { description: page.data.description } : {}),
      ...(product ? { tag: product } : {}),
    };

    return index;
  },
});
