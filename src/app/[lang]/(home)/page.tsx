import type { Metadata } from 'next';
import Link from 'next/link';
import { getT } from '@/lib/i18next';
import { Button } from '@/components/ui/button';
import { NasaParticles } from '@/components/home/nasa-particles';
import { HomeSections } from '@/components/home/home-sections';
import { SiteFooter } from '@/components/home/site-footer';
import { JsonLd } from '@/components/json-ld';
import {
  absoluteUrl,
  buildKeywords,
  buildPageMetadata,
  homeJsonLd,
  siteConfig,
} from '@/lib/seo';
import { getHome, getSeo } from '@/lib/common-messages';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const home = getHome(lang);
  const seo = getSeo(lang);

  return {
    ...buildPageMetadata({
      title: siteConfig.name,
      description: home.description,
      locale: lang,
      path: `/${lang}`,
      pathWithoutLocale: '/',
      imageAlt: seo.logoAlt,
      keywords: buildKeywords(lang),
      type: 'website',
    }),
    title: {
      absolute: siteConfig.name,
    },
  };
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const { t } = await getT(lang, 'home');
  const home = getHome(lang);
  const seo = getSeo(lang);
  const docsHref = `/${lang}/docs`;
  const url = absoluteUrl(`/${lang}`);

  return (
    <>
      <JsonLd
        data={homeJsonLd({
          title: siteConfig.name,
          description: home.description,
          locale: lang,
          url,
        })}
      />
      <NasaParticles />
      <main className="relative z-10 w-full">
        <section
          aria-labelledby="home-hero-heading"
          className="relative mx-auto flex min-h-[min(88vh,56rem)] w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 py-16 text-center sm:gap-10 sm:px-6 sm:py-24"
        >
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <h1
              id="home-hero-heading"
              className="text-foreground max-w-5xl text-5xl font-bold tracking-tight text-balance lg:text-7xl"
            >
              {t('welcome')}
            </h1>
            <p className="text-muted-foreground max-w-xl text-base text-pretty sm:text-lg md:text-xl">
              {t('description')}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:gap-2">
            <Button
              className="w-full sm:w-auto"
              nativeButton={false}
              render={<Link href={docsHref} />}
              size="lg"
            >
              {t('openDocs')}
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              nativeButton={false}
              render={<Link href={docsHref} />}
              size="lg"
            >
              {t('openLearn')}
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            <a
              href={siteConfig.org.url}
              className="underline-offset-4 transition-colors hover:underline focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2"
              rel="noopener noreferrer"
              target="_blank"
            >
              {seo.builtBy}
            </a>
          </p>
        </section>

        <div
          aria-hidden
          className="from-background pointer-events-none relative z-10 -mt-24 h-24 bg-gradient-to-t to-transparent"
        />

        <HomeSections lang={lang} home={home} />
      </main>
      <SiteFooter lang={lang} home={home} />
    </>
  );
}
