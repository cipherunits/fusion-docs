import Link from 'next/link';
import { getT } from '@/lib/i18next';
import { Button } from '@/components/ui/button';
import { docProducts, getDocHref, latestVersion } from '@/lib/docs';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const { t } = await getT(lang, 'common');

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-semibold tracking-tight">{t('welcome')}</h1>
        <p className="text-muted-foreground max-w-xl text-lg">{t('description')}</p>
      </div>

      <div className="w-full">
        <p className="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
          {t('productsHeading')}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {docProducts.map((product) => (
            <Link
              key={product.id}
              href={getDocHref(lang, product.id, latestVersion[product.id])}
              className="border-border hover:bg-muted/50 rounded-xl border p-5 text-left transition-colors"
            >
              <h2 className="text-lg font-medium">{t(product.id)}</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {t(`${product.id}Desc`)}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <Button
        nativeButton={false}
        render={
          <Link
            href={getDocHref(lang, 'typescript', latestVersion.typescript)}
          />
        }
        size="lg"
      >
        {t('openDocs')}
      </Button>
    </main>
  );
}
