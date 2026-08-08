'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  type DocProductId,
  docVersions,
  isDocProductId,
  latestVersion,
} from '@/lib/docs';

export function VersionSelect() {
  const router = useRouter();
  const params = useParams<{ lang?: string; slug?: string[] }>();
  const lang = typeof params.lang === 'string' ? params.lang : 'en';
  const slug = Array.isArray(params.slug) ? params.slug : [];

  const product = slug[0];
  const version = slug[1];

  const activeProduct: DocProductId | null =
    product && isDocProductId(product) ? product : null;

  const versions = useMemo(
    () => (activeProduct ? [...docVersions[activeProduct]] : []),
    [activeProduct],
  );

  if (!activeProduct || versions.length === 0) {
    return null;
  }

  const currentVersion =
    version && versions.includes(version)
      ? version
      : latestVersion[activeProduct];

  return (
    <label className="text-fd-muted-foreground flex flex-col gap-1.5 px-2 text-xs font-medium">
      Version
      <select
        className="border-fd-border bg-fd-secondary text-fd-foreground rounded-md border px-2 py-1.5 text-sm outline-none disabled:opacity-70"
        value={currentVersion}
        disabled={versions.length === 1}
        onChange={(event) => {
          const nextVersion = event.target.value;
          const rest = slug.slice(2);
          const href = `/${[lang, 'docs', activeProduct, nextVersion, ...rest].join('/')}`;
          router.push(href);
        }}
      >
        {versions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
