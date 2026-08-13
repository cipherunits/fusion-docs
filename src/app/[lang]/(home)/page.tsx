import type { Metadata } from 'next';
import Link from 'next/link';
import { getT } from '@/lib/i18next';
import { Button } from '@/components/ui/button';
import { NasaParticles } from '@/components/home/nasa-particles';
import { buildPageMetadata, siteConfig } from '@/lib/seo';
import { getHome } from '@/lib/common-messages';

export async function generateMetadata({
  params,
}: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const home = getHome(lang);

  return {
    ...buildPageMetadata({
      title: siteConfig.name,
      description: home.description,
      locale: lang,
      path: `/${lang}`,
      pathWithoutLocale: '/',
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
  const docsHref = `/${lang}/docs`;

  return (
    <>
      <NasaParticles />
      <main className="relative z-10 mx-auto flex min-h-[70vh] w-full flex-col items-center justify-center gap-8 px-4 py-12 text-center sm:gap-10 sm:px-6 sm:py-16">
        <div className="flex flex-col items-center gap-6 mt-20 sm:gap-12">
          <h1 className="max-w-5xl text-5xl font-bold tracking-tight text-balance lg:text-7xl">
            {t('welcome')}
          </h1>
          <p className="text-muted-foreground max-w-xl text-base text-pretty sm:text-lg md:text-xl">
            {t('description')}
          </p>
        </div>
        <div className="mt-2 flex w-full max-w-md flex-col gap-3 sm:mt-6 sm:max-w-none sm:w-auto sm:flex-row sm:gap-2">
          <Button
            className="w-full sm:w-auto p-4"
            nativeButton={false}
            render={<Link href={docsHref} />}
            size="lg"
          >
            {t('openDocs')}
          </Button>
          <Button
            className="w-full sm:w-auto p-4"
            variant="outline"
            nativeButton={false}
            render={<Link href={docsHref} />}
            size="lg"
          >
            {t('openLearn')}
          </Button>
        </div>
      </main>
    </>
  );
}
