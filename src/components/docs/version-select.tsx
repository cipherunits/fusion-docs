'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, Tag } from 'lucide-react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'fumadocs-ui/components/ui/popover';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18next/client';
import type { DocVersion } from '@/lib/docs';

type VersionSelectProps = {
  /** Version entries for the active product, from content meta order. */
  versions: DocVersion[];
};

export function VersionSelect({ versions }: VersionSelectProps) {
  const { t } = useT('common');
  const router = useRouter();
  const params = useParams<{ lang?: string; slug?: string[] }>();
  const [open, setOpen] = useState(false);
  const lang = typeof params.lang === 'string' ? params.lang : 'en';
  const slug = Array.isArray(params.slug) ? params.slug : [];

  const product = slug[0];
  const version = slug[1];

  if (!product || versions.length === 0) {
    return null;
  }

  const current =
    (version ? versions.find((item) => item.id === version) : undefined) ??
    versions[0];

  if (!current) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={t('chooseVersion')}
        className={cn(
          buttonVariants({ color: 'secondary' }),
          'text-fd-muted-foreground mb-2 w-full justify-start gap-1.5 bg-fd-secondary/50 text-start',
        )}
      >
        <Tag className="size-4.5" />
        <span>{current.id}</span>
        <ChevronDown className="ms-auto size-3.5" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-0.5 p-1" align="start">
        <p className="text-fd-muted-foreground p-2 text-xs font-medium">
          {t('chooseVersion')}
        </p>
        {versions.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              'rounded-lg px-2 py-1.5 text-start transition-colors',
              item.id === current.id
                ? 'bg-fd-primary/10 text-fd-primary'
                : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
            )}
            onClick={() => {
              setOpen(false);
              if (item.id === current.id) {
                return;
              }
              const rest = slug.slice(2);
              const href = `/${[lang, 'docs', product, item.id, ...rest].join('/')}`;
              router.push(href);
            }}
          >
            <span className="block text-sm font-medium">{item.id}</span>
            {item.release ? (
              <span
                className={cn(
                  'mt-0.5 block text-xs',
                  item.id === current.id
                    ? 'text-fd-primary/70'
                    : 'text-fd-muted-foreground',
                )}
              >
                {t('version')} {item.release}
              </span>
            ) : null}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
