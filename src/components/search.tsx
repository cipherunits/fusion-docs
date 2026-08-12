'use client';

import { useMemo, useState } from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { fetchClient } from 'fumadocs-core/search/client/fetch';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { useDocsProducts } from '@/components/docs/docs-products-context';

export default function CustomSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const products = useDocsProducts();
  const defaultTag = products[0]?.id ?? '';
  const [tag, setTag] = useState(defaultTag);
  const activeTag = products.some((product) => product.id === tag)
    ? tag
    : defaultTag;

  const { search, setSearch, query } = useDocsSearch({
    client: fetchClient({
      ...(activeTag ? { tag: activeTag } : {}),
      ...(locale ? { locale } : {}),
    }),
  });

  const items = useMemo(
    () => (query.data !== 'empty' ? query.data : null),
    [query.data],
  );

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        {products.length > 0 ? (
          <div className="border-fd-border border-b px-3 pt-3 pb-2">
            <TagsList
              tag={activeTag}
              onTagChange={(value) => {
                if (value) {
                  setTag(value);
                }
              }}
            >
              {products.map((product) => (
                <TagsListItem key={product.id} value={product.id}>
                  {product.title}
                </TagsListItem>
              ))}
            </TagsList>
          </div>
        ) : null}
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
