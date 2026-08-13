import type { Metadata } from "next";
import { DownloadPlatforms } from "@/components/gui/download-platforms";
import { JsonLd } from "@/components/json-ld";
import { getCommon, getGui } from "@/lib/common-messages";
import {
  absoluteUrl,
  buildPageMetadata,
  downloadJsonLd,
  getGuiOgImageUrl,
  siteConfig,
} from "@/lib/seo";

const DOWNLOAD_KEYWORDS = [
  "Fusion Desktop",
  "download Fusion",
  "Fusion app",
  "Fusion Windows",
  "Fusion Linux",
  "desktop client",
  "backend desktop app",
  "Cipher Unit",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const gui = getGui(lang);
  const ogImage = absoluteUrl(getGuiOgImageUrl(lang));

  return {
    ...buildPageMetadata({
      title: gui.downloadTitle,
      description: gui.downloadDescription,
      locale: lang,
      path: `/${lang}/gui`,
      pathWithoutLocale: "/gui",
      image: ogImage,
      type: "website",
    }),
    keywords: [...DOWNLOAD_KEYWORDS],
    category: "technology",
    applicationName: siteConfig.name,
  };
}

export default async function GuiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const common = getCommon(lang);
  const gui = getGui(lang);
  const url = absoluteUrl(`/${lang}/gui`);

  return (
    <>
      <JsonLd
        data={downloadJsonLd({
          title: gui.downloadTitle,
          description: gui.downloadDescription,
          locale: lang,
          url,
          appName: `${siteConfig.name} Desktop`,
          breadcrumbs: [
            { name: siteConfig.name, url: absoluteUrl(`/${lang}`) },
            { name: common.app, url },
          ],
        })}
      />
      <DownloadPlatforms messages={gui} />
    </>
  );
}
