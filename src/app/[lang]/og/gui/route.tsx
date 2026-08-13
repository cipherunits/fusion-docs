import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { i18n } from '@/lib/i18n';
import { getGui } from '@/lib/common-messages';
import { siteConfig } from '@/lib/seo';

export const revalidate = false;

/** Arabic / Persian / Hebrew — Satori still crashes on some OpenType lookups. */
const COMPLEX_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/;

function needsLatinFallback(text: string | undefined): boolean {
  return Boolean(text && COMPLEX_SCRIPT.test(text));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  const locale = i18n.languages.includes(lang as (typeof i18n.languages)[number])
    ? lang
    : i18n.defaultLanguage;

  const gui = getGui(locale);
  const english = getGui(i18n.defaultLanguage);

  const title = needsLatinFallback(gui.downloadTitle)
    ? english.downloadTitle
    : gui.downloadTitle;
  const description = needsLatinFallback(gui.downloadDescription)
    ? english.downloadDescription
    : gui.downloadDescription;

  return new ImageResponse(
    (
      <DefaultImage
        title={title}
        description={description}
        site={siteConfig.name}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
