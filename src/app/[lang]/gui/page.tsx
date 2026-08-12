import type { Metadata } from "next";
import { DownloadPlatforms } from "@/components/gui/download-platforms";
import { getCommon } from "@/lib/common-messages";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const common = getCommon(lang);

  return buildPageMetadata({
    title: common.downloadTitle,
    description: common.downloadDescription,
    locale: lang,
    path: `/${lang}/gui`,
    pathWithoutLocale: "/gui",
    type: "website",
  });
}

export default async function GuiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const common = getCommon(lang);

  return <DownloadPlatforms messages={common} />;
}
