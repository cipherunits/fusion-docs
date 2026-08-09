import localFont from 'next/font/local';
import { Geist_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { notFound } from 'next/navigation';
import { translations } from '@/lib/layout.shared';
import { type AppLocale, i18n, localeDirection } from '@/lib/i18n';
import '@/app/styles/globals.css';

const inter = localFont({
  src: [
    {
      path: '../../../public/fonts/InterRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/InterMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/InterSemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/InterBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  if (!i18n.languages.includes(lang as AppLocale)) {
    notFound();
  }

  const locale = lang as AppLocale;

  return (
    <html
      lang={locale}
      dir={localeDirection[locale] ?? 'ltr'}
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <RootProvider i18n={i18nProvider(translations, locale)}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
