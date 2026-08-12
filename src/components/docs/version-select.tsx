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

type VersionSelectProps = {
  /** Version ids for the active product, from content meta order. */
  versions: string[];
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

  const currentVersion =
    version && versions.includes(version)
      ? version
      : (versions[0] ?? version ?? '');

  if (!currentVersion) {
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
        <span>{currentVersion}</span>
        <ChevronDown className="ms-auto size-3.5" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-0.5 p-1" align="start">
        <p className="text-fd-muted-foreground p-2 text-xs font-medium">
          {t('chooseVersion')}
        </p>
        {versions.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              'rounded-lg px-2 py-1.5 text-start text-sm transition-colors',
              item === currentVersion
                ? 'bg-fd-primary/10 text-fd-primary'
                : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground',
            )}
            onClick={() => {
              setOpen(false);
              if (item === currentVersion) {
                return;
              }
              const rest = slug.slice(2);
              const href = `/${[lang, 'docs', product, item, ...rest].join('/')}`;
              router.push(href);
            }}
          >
            {item}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
