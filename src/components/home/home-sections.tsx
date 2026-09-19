import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  Braces,
  Layers,
  Route,
  Server,
  Terminal,
  Workflow,
} from 'lucide-react';
import type { HomeMessages } from '@/lib/common-messages';
import { Button } from '@/components/ui/button';
import { PoweredByLanguages } from '@/components/home/powered-by-languages';
import { cn } from '@/lib/utils';

type HomeSectionsProps = {
  lang: string;
  home: HomeMessages;
};

const featureIcons = [Server, Boxes, Route, Terminal, Layers, Braces] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <p className="text-muted-foreground mb-3 text-sm font-medium tracking-wide uppercase">
        {eyebrow}
      </p>
      <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-4 text-base text-pretty sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export function HomeSections({ lang, home }: HomeSectionsProps) {
  const docsHref = `/${lang}/docs`;

  return (
    <div className="relative z-10 flex w-full flex-col">
      <section
        aria-labelledby="features-heading"
        className="border-border bg-background border-t px-4 py-20 sm:px-6 sm:py-28"
      >
        <SectionHeading
          eyebrow={home.features.eyebrow}
          title={home.features.title}
          description={home.features.description}
        />
        <h2 id="features-heading" className="sr-only">
          {home.features.title}
        </h2>
        <ul className="mx-auto mt-14 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
          {home.features.items.map((item, index) => {
            const Icon = featureIcons[index] ?? Workflow;
            return (
              <li
                key={item.title}
                className="group motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="bg-muted text-foreground mb-4 inline-flex size-10 items-center justify-center rounded-lg transition-transform duration-200 group-hover:-translate-y-0.5">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="text-foreground text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty sm:text-base">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <PoweredByLanguages lang={lang} poweredBy={home.poweredBy} />

      <section
        aria-labelledby="benchmarks-heading"
        className="border-border bg-background border-t px-4 py-20 sm:px-6 sm:py-28"
      >
        <SectionHeading
          eyebrow={home.benchmarks.eyebrow}
          title={home.benchmarks.title}
          description={home.benchmarks.description}
        />
        <h2 id="benchmarks-heading" className="sr-only">
          {home.benchmarks.title}
        </h2>
        <dl className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {home.benchmarks.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-border bg-muted/60 rounded-xl border px-4 py-6 text-center sm:px-6"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
                {stat.value}
              </dd>
              <p className="text-foreground mt-3 text-sm font-medium">
                {stat.label}
              </p>
              <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                {stat.detail}
              </p>
            </div>
          ))}
        </dl>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-3">
          {home.benchmarks.pillars.map((pillar) => (
            <li key={pillar.title}>
              <h3 className="text-foreground text-base font-medium tracking-tight sm:text-lg">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty sm:text-base">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="workflow-heading"
        className="border-border bg-muted border-t px-4 py-20 sm:px-6 sm:py-28"
      >
        <SectionHeading
          eyebrow={home.workflow.eyebrow}
          title={home.workflow.title}
          description={home.workflow.description}
        />
        <h2 id="workflow-heading" className="sr-only">
          {home.workflow.title}
        </h2>
        <ol className="mx-auto mt-14 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {home.workflow.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="text-muted-foreground font-mono text-sm">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-foreground mt-3 text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="ecosystem-heading"
        className="border-border bg-background border-t px-4 py-20 sm:px-6 sm:py-28"
      >
        <SectionHeading
          eyebrow={home.ecosystem.eyebrow}
          title={home.ecosystem.title}
          description={home.ecosystem.description}
        />
        <h2 id="ecosystem-heading" className="sr-only">
          {home.ecosystem.title}
        </h2>
        <ul className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {home.ecosystem.items.map((item) => {
            const href =
              item.href === 'python'
                ? docsHref
                : `/${lang}/docs/${item.href}/v1`;
            return (
              <li key={item.title}>
                <Link
                  href={href}
                  className="border-border bg-background group flex h-full flex-col rounded-xl border p-6 transition-all duration-200 hover:border-foreground/20 hover:bg-muted focus-visible:ring-ring outline-none focus-visible:ring-2"
                >
                  <h3 className="text-foreground text-lg font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed text-pretty">
                    {item.description}
                  </p>
                  <span className="text-foreground mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                    <ArrowRight
                      className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="border-border  border-t px-4 py-20 backdrop-blur-xs sm:px-6 sm:py-28"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="cta-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            {home.cta.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base text-pretty sm:text-lg">
            {home.cta.description}
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:gap-2">
            <Button
              className="w-full sm:w-auto"
              size="lg"
              nativeButton={false}
              render={<Link href={docsHref} />}
            >
              {home.cta.primary}
            </Button>
            <Button
              className="w-full sm:w-auto"
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={`/${lang}/gui`} />}
            >
              {home.cta.secondary}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
