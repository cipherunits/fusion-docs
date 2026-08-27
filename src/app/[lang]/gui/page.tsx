import type { Metadata } from "next";
import { DownloadPlatforms } from "@/components/gui/download-platforms";
import { JsonLd } from "@/components/json-ld";
import { getCommon, getGui, getSeo } from "@/lib/common-messages";
import {
  absoluteUrl,
  buildKeywords,
  buildPageMetadata,
  downloadJsonLd,
  getGuiOgImageUrl,
  siteConfig,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const gui = getGui(lang);
  const seo = getSeo(lang);
  const ogImage = absoluteUrl(getGuiOgImageUrl(lang));

  return {
    ...buildPageMetadata({
      title: gui.downloadTitle,
      description: gui.downloadDescription,
      locale: lang,
      path: `/${lang}/gui`,
      pathWithoutLocale: "/gui",
      image: ogImage,
      imageAlt: `${gui.downloadTitle} — ${seo.logoAlt}`,
      keywords: buildKeywords(lang, [], { download: true }),
      type: "website",
    }),
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
  const seo = getSeo(lang);
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
      <p className="text-muted-foreground mx-auto mt-8 max-w-3xl px-4 pb-10 text-center text-sm">
        <a
          href={siteConfig.org.url}
          className="underline-offset-4 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {seo.builtBy}
        </a>
      </p>
    </>
  );
}
