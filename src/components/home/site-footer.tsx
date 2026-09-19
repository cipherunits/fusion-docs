import Link from 'next/link';
import type { ReactNode } from 'react';
import type { HomeMessages } from '@/lib/common-messages';
import { siteConfig } from '@/lib/seo';

type SiteFooterProps = {
  lang: string;
  home: HomeMessages;
};

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    'text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm transition-colors outline-none hover:underline focus-visible:ring-2';

  if (external) {
    return (
      <a
        href={href}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteFooter({ lang, home }: SiteFooterProps) {
  const footer = home.footer;
  if (!footer) {
    return null;
  }

  const year = new Date().getFullYear();
  const copyright = footer.copyright.replace('{{year}}', String(year));

  return (
    <footer className="border-border bg-background/80 relative z-10 border-t backdrop-blur-lg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-foreground text-base font-semibold tracking-tight">
            Fusion
          </p>
          <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed text-pretty">
            {footer.tagline}
          </p>
        </div>

        <div>
          <p className="text-foreground text-sm font-medium">{footer.product}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <FooterLink href={`/${lang}/docs`}>{footer.docs}</FooterLink>
            </li>
            <li>
              <FooterLink href={`/${lang}/docs/architecture/v1`}>
                {footer.architecture}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={`/${lang}/docs/cli/v1`}>{footer.cli}</FooterLink>
            </li>
            <li>
              <FooterLink href={`/${lang}/gui`}>{footer.desktop}</FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-foreground text-sm font-medium">
            {footer.languages}
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <FooterLink href={`/${lang}/docs/python/v1`}>
                {footer.python}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={`/${lang}/docs/typescript/v1`}>
                {footer.typescript}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={`/${lang}/docs/csharp/v1`}>
                {footer.csharp}
              </FooterLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-foreground text-sm font-medium">
            {footer.resources}
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <FooterLink href={siteConfig.org.github} external>
                {footer.github}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={siteConfig.org.githubFramework} external>
                {footer.framework}
              </FooterLink>
            </li>
            <li>
              <FooterLink href={siteConfig.org.url} external>
                {footer.website}
              </FooterLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm">
          <p>{copyright}</p>
          <p className="text-muted-foreground/80">{siteConfig.org.email}</p>
        </div>
      </div>
    </footer>
  );
}
