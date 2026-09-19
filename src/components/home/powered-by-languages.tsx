'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { HomeMessages } from '@/lib/common-messages';
import { cn } from '@/lib/utils';

type PoweredByLanguagesProps = {
  lang: string;
  poweredBy: HomeMessages['poweredBy'];
};

const CARDS = [
  {
    id: 'python',
    glow: 'shadow-[0_0_40px_-8px_var(--lang-python)]',
    topGlow: 'bg-lang-python',
  },
  {
    id: 'typescript',
    glow: 'shadow-[0_0_40px_-8px_var(--lang-typescript)]',
    topGlow: 'bg-lang-typescript',
  },
  {
    id: 'csharp',
    glow: 'shadow-[0_0_40px_-8px_var(--lang-csharp)]',
    topGlow: 'bg-lang-csharp',
  },
] as const;

/** Desktop PCB traces — start inside chip center, route down to cards */
const TRACES = [
  {
    id: 'py-main',
    d: 'M480 36 H400 V70 H160 V110 H120 V168',
    accent: 'var(--lang-python)',
    delay: '0s',
    duration: '4.2s',
  },
  {
    id: 'py-side',
    d: 'M465 36 H380 V55 H200 V90 H140 V168',
    accent: 'var(--lang-python)',
    delay: '0.55s',
    duration: '4.8s',
  },
  {
    id: 'ts-main',
    d: 'M480 36 V168',
    accent: 'var(--lang-typescript)',
    delay: '0.2s',
    duration: '3.8s',
  },
  {
    id: 'ts-side',
    d: 'M495 36 V80 H520 V110 H480 V168',
    accent: 'var(--lang-typescript)',
    delay: '0.7s',
    duration: '4.5s',
  },
  {
    id: 'cs-main',
    d: 'M480 36 H560 V70 H800 V110 H840 V168',
    accent: 'var(--lang-csharp)',
    delay: '0.15s',
    duration: '4.2s',
  },
  {
    id: 'cs-side',
    d: 'M495 36 H580 V55 H760 V90 H820 V168',
    accent: 'var(--lang-csharp)',
    delay: '0.65s',
    duration: '4.8s',
  },
] as const;

const MOBILE_TRACES = [
  {
    accent: 'var(--lang-python)',
    delay: '0s',
    duration: '3.6s',
  },
  {
    accent: 'var(--lang-typescript)',
    delay: '0.25s',
    duration: '3.8s',
  },
  {
    accent: 'var(--lang-csharp)',
    delay: '0.45s',
    duration: '4s',
  },
] as const;

function LanguageMark({ id }: { id: string }) {
  if (id === 'python') {
    return (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2C7.6 2 7.2 4 7.2 4v2.4h4.9v.8H5.3S2 7 2 12.1c0 5 2.6 4.8 2.6 4.8h1.6v-2.3c0-2.1 1.8-3.9 3.9-3.9h4.7c1.8 0 3.2-1.5 3.2-3.3V4.1S18.6 2 12 2zm-2.1 1.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
        />
        <path
          fill="currentColor"
          opacity="0.7"
          d="M12 22c4.4 0 4.8-2 4.8-2v-2.4h-4.9v-.8h6.8S22 17 22 11.9c0-5-2.6-4.8-2.6-4.8h-1.6v2.3c0 2.1-1.8 3.9-3.9 3.9H9.2c-1.8 0-3.2 1.5-3.2 3.3v4.2S5.4 22 12 22zm2.1-1.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
        />
      </svg>
    );
  }

  if (id === 'typescript') {
    return (
      <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
        <rect width="24" height="24" rx="3" fill="currentColor" opacity="0.15" />
        <path
          fill="currentColor"
          d="M1.5 12.1h9.3v2H7.1V21H4.7v-6.9H1.5zm13.2-.2c.7-.1 1.5-.1 2.5 0 .7.1 1.4.3 2 .6l-.6 2c-.4-.2-.9-.4-1.4-.5-.7-.1-1.3 0-1.7.3-.3.2-.4.5-.4.8 0 .3.1.5.4.7.3.2.9.5 1.7.8 1.3.5 2.2 1.1 2.6 1.7.5.6.7 1.4.7 2.3 0 1.1-.4 2-1.2 2.7-.8.7-2 1.1-3.5 1.1-1.1 0-2.1-.2-2.9-.5-.8-.3-1.4-.7-1.9-1.1l.8-1.9c.4.3.9.6 1.5.8.6.2 1.2.3 1.8.3.7 0 1.2-.1 1.5-.4.3-.3.5-.6.5-1 0-.4-.2-.7-.5-.9-.4-.3-1.1-.6-2.1-1-1.1-.4-1.9-.9-2.4-1.5-.5-.6-.8-1.4-.8-2.3 0-1 .4-1.9 1.1-2.5.8-.7 1.9-1.1 3.3-1.2z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-7" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2 2.5 5.1v5.5c0 5.5 3.8 10.6 9.5 11.9 5.7-1.3 9.5-6.4 9.5-11.9V5.1L12 2zm5.2 7.8-6.8 6.8-3.6-3.6 1.4-1.4 2.2 2.2 5.4-5.4 1.4 1.4z"
      />
    </svg>
  );
}

function MobileTrace({
  active,
  accent,
  delay,
  duration,
  index,
  first,
}: {
  active: boolean;
  accent: string;
  delay: string;
  duration: string;
  index: number;
  first?: boolean;
}) {
  const path = first ? 'M24 0 V20 H24 V56' : 'M24 0 V56';
  const filterId = `mobile-glow-${index}`;

  return (
    <div className="relative z-[1] flex h-14 w-full items-center justify-center md:hidden" aria-hidden>
      <svg className="h-full w-12" viewBox="0 0 48 56" fill="none">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={path}
          className="stroke-border"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: active ? 0 : 100,
            transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: active ? delay : '0s',
          }}
        />
        <path
          d={path}
          className={cn('fusion-trace-pulse', active && 'is-active')}
          stroke={accent}
          strokeWidth="2.25"
          strokeLinecap="round"
          pathLength={100}
          filter={`url(#${filterId})`}
          style={
            {
              '--fusion-trace-delay': delay,
              '--fusion-trace-duration': duration,
            } as CSSProperties
          }
        />
        <circle
          cx="24"
          cy="56"
          r="2.75"
          fill={accent}
          className={cn('fusion-circuit-dot', active && 'is-active')}
          style={{
            opacity: active ? undefined : 0,
            transition: `opacity 0.35s ease calc(${delay} + 0.7s)`,
            animationDelay: `calc(${delay} + 0.7s)`,
          }}
        />
      </svg>
    </div>
  );
}

function CircuitBoard({ active }: { active: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-6 z-[1] hidden h-[15rem] w-full md:top-10 md:block"
      viewBox="0 0 960 200"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        {TRACES.map((trace) => (
          <filter
            key={`glow-${trace.id}`}
            id={`fusion-glow-${trace.id}`}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>

      {/* Hub node — wires meet in chip center */}
      <circle
        cx="480"
        cy="36"
        r="3.5"
        className="fill-muted-foreground/50"
        style={{
          opacity: active ? 1 : 0,
          transition: 'opacity 0.5s ease 0.8s',
        }}
      />

      {TRACES.map((trace) => (
        <g key={trace.id}>
          <path
            d={trace.d}
            className="stroke-border"
            strokeWidth="1.25"
            strokeLinecap="square"
            strokeLinejoin="miter"
            pathLength={100}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: active ? 0 : 100,
              transition: `stroke-dashoffset 1.35s cubic-bezier(0.4, 0, 0.2, 1)`,
              transitionDelay: active ? '0.15s' : '0s',
            }}
          />
          <path
            d={trace.d}
            className={cn('fusion-trace-pulse', active && 'is-active')}
            stroke={trace.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            filter={`url(#fusion-glow-${trace.id})`}
            style={
              {
                '--fusion-trace-delay': trace.delay,
                '--fusion-trace-duration': trace.duration,
              } as CSSProperties
            }
          />
        </g>
      ))}
    </svg>
  );
}

function ChipBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={cn(
        'relative z-10 mt-7 mx-auto flex w-fit items-center justify-center transition-all duration-700 ease-out',
        active
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-4 scale-95 opacity-0',
      )}
    >
      <div
        className={cn(
          'border-border bg-card text-foreground relative z-10 flex h-16 min-w-[14rem] items-center justify-center rounded-xl border px-10 text-lg font-semibold tracking-wide sm:h-[4.5rem] sm:min-w-[16rem] sm:text-xl',
          'shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_12%,transparent),inset_0_-1px_0_color-mix(in_oklch,var(--foreground)_4%,transparent),0_12px_40px_-16px_color-mix(in_oklch,var(--foreground)_35%,transparent),0_0_0_1px_color-mix(in_oklch,var(--foreground)_6%,transparent)]',
        )}
      >
        {/* Side pins */}
        <span aria-hidden className="bg-border absolute top-3 bottom-3 -left-2.5 w-2 rounded-sm" />
        <span aria-hidden className="bg-border absolute top-3 bottom-3 -right-2.5 w-2 rounded-sm" />
        <span aria-hidden className="bg-muted-foreground/40 absolute top-[22%] -left-4 h-2 w-2.5 rounded-[2px]" />
        <span aria-hidden className="bg-muted-foreground/40 absolute top-[48%] -left-4 h-2 w-2.5 rounded-[2px]" />
        <span aria-hidden className="bg-muted-foreground/40 absolute top-[74%] -left-4 h-2 w-2.5 rounded-[2px]" />
        <span aria-hidden className="bg-muted-foreground/40 absolute top-[22%] -right-4 h-2 w-2.5 rounded-[2px]" />
        <span aria-hidden className="bg-muted-foreground/40 absolute top-[48%] -right-4 h-2 w-2.5 rounded-[2px]" />
        <span aria-hidden className="bg-muted-foreground/40 absolute top-[74%] -right-4 h-2 w-2.5 rounded-[2px]" />
        {/* Soft outer aura */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--foreground)_8%,transparent),transparent_70%)] blur-md"
        />
        {label}
      </div>
    </div>
  );
}

export function PoweredByLanguages({ lang, poweredBy }: PoweredByLanguagesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="powered-by-heading"
      className="border-border bg-background relative overflow-hidden border-t px-4 py-20 sm:px-6 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_35%,color-mix(in_oklch,var(--muted)_90%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-64 max-w-3xl bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--foreground)_6%,transparent),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <h2
          id="powered-by-heading"
          className={cn(
            'text-foreground mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-balance transition-all duration-700 sm:text-4xl',
            active ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
          )}
        >
          {poweredBy.title}
        </h2>

        <div className="relative mt-16 md:mt-20 md:min-h-[26rem]">
          <CircuitBoard active={active} />
          <div className="relative z-10 pt-6 md:pt-10">
            <ChipBadge label={poweredBy.chip} active={active} />
          </div>

          <ul className="mt-2 grid gap-0 md:mt-36 md:grid-cols-3 md:gap-6">
            {poweredBy.items.map((item, index) => {
              const card = CARDS[index] ?? CARDS[0];
              const mobileTrace = MOBILE_TRACES[index] ?? MOBILE_TRACES[0];
              const href = `/${lang}/docs/${item.id}/v1`;
              const cardDelay = 900 + index * 140;

              return (
                <li
                  key={item.id}
                  className={cn(
                    'flex flex-col transition-all duration-700 ease-out',
                    active
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0',
                  )}
                  style={{ transitionDelay: active ? `${cardDelay}ms` : '0ms' }}
                >
                  <MobileTrace
                    active={active}
                    accent={mobileTrace.accent}
                    delay={mobileTrace.delay}
                    duration={mobileTrace.duration}
                    index={index}
                    first={index === 0}
                  />
                  <Link
                    href={href}
                    className={cn(
                      'border-border bg-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6',
                      'shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_6%,transparent)_inset,0_18px_50px_-24px_color-mix(in_oklch,var(--foreground)_45%,transparent)]',
                      'transition-all duration-300 hover:-translate-y-1',
                      'hover:border-foreground/15',
                      'focus-visible:ring-ring outline-none focus-visible:ring-2',
                      card.glow,
                    )}
                  >
                    {/* Top edge accent glow (Next.js style) */}
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute top-0 left-1/2 h-[2px] w-24 -translate-x-1/2 rounded-full opacity-90',
                        card.topGlow,
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        'pointer-events-none absolute -top-6 left-1/2 h-12 w-32 -translate-x-1/2 rounded-full opacity-40 blur-2xl',
                        card.topGlow,
                      )}
                    />

                    <div className="text-foreground relative mb-4 flex items-center gap-3">
                      <span className="bg-muted/80 ring-border inline-flex size-11 items-center justify-center rounded-xl ring-1 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]">
                        <LanguageMark id={item.id} />
                      </span>
                      <span className="text-lg font-semibold tracking-tight">
                        {item.name}
                      </span>
                      <ArrowUpRight
                        className="text-muted-foreground size-4 opacity-60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <p className="text-muted-foreground relative text-sm leading-relaxed text-pretty sm:text-[0.95rem]">
                      {item.description}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
