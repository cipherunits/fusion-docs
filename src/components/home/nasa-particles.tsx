'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

async function particlesInit(engine: Engine) {
  await loadSlim(engine);
}

function useIsDark() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const sync = () => {
      setIsDark(root.classList.contains('dark'));
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

function useParticleCount() {
  const [count, setCount] = useState(500);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');

    const sync = () => {
      setCount(media.matches ? 250 : 500);
    };

    sync();
    media.addEventListener('change', sync);

    return () => media.removeEventListener('change', sync);
  }, []);

  return count;
}

export function NasaParticles() {
  const isDark = useIsDark();
  const particleCount = useParticleCount();
  const particleColor = isDark ? '#ffffff' : '#000000';

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: {
            enable: false,
          },
          onClick: {
            enable: false,
          },
        },
      },
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: false,
          },
        },
        paint: {
          color: {
            value: particleColor,
          },
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: {
            min: 0.25,
            max: 1,
          },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        size: {
          value: {
            min: 1,
            max: 3,
          },
        },
        move: {
          enable: true,
          speed: {
            min: 0.1,
            max: 1,
          },
        },
      },
    }),
    [particleColor, particleCount],
  );

  if (isDark === null) {
    return null;
  }

  return (
    <>
      <ParticlesProvider init={particlesInit}>
        <Particles
          key={`${particleColor}-${particleCount}`}
          id="home-nasa-particles"
          className="pointer-events-none"
          options={options}
          style={{ pointerEvents: 'none' }}
        />
      </ParticlesProvider>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-2 bg-background/70"
      />
    </>
  );
}
