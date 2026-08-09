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
import { docProducts } from '@/lib/docs';

const DEFAULT_TAG = 'python';

const searchTags = [
  ...docProducts.filter((product) => product.id === DEFAULT_TAG),
  ...docProducts.filter((product) => product.id !== DEFAULT_TAG),
];

export default function CustomSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const [tag, setTag] = useState(DEFAULT_TAG);
  const { search, setSearch, query } = useDocsSearch({
    client: fetchClient({
      tag,
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
        <div className="border-fd-border border-b px-3 pt-3 pb-2">
          <TagsList
            tag={tag}
            onTagChange={(value) => {
              if (value) {
                setTag(value);
              }
            }}
          >
            {searchTags.map((product) => (
              <TagsListItem key={product.id} value={product.id}>
                {product.title}
              </TagsListItem>
            ))}
          </TagsList>
        </div>
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
