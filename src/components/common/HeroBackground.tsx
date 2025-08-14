// Hero background: lazy-mount the heavy 3D scene after idle to keep TBT low
import React, { useEffect, useRef, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const LazyHeroScene = React.lazy(() => import('../three/HeroScene'));

const HeroShapes: React.FC = () => {
  const theme = useTheme();
  // Trigger MUI breakpoint calculations so our 3D scene can respond to size
  useMediaQuery(theme.breakpoints.down('md'));

  const dev = import.meta.env.DEV;
  const [idleReady, setIdleReady] = useState<boolean>(dev ? true : false);
  const [inView, setInView] = useState<boolean>(dev ? true : false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // In prod, wait for an idle slice before mounting heavy 3D
  useEffect(() => {
    if (dev) return;
    let idleHandle: number | null = null;
    const ric = (window as any).requestIdleCallback as ((cb: () => void) => number) | undefined;
    const cancelRic = (window as any).cancelIdleCallback as ((id: number) => void) | undefined;

    if (ric) {
      idleHandle = ric(() => setIdleReady(true));
    } else {
      idleHandle = window.setTimeout(() => setIdleReady(true), 800);
    }

    return () => {
      if (idleHandle !== null) {
        if (ric && cancelRic) cancelRic(idleHandle);
        else clearTimeout(idleHandle);
      }
    };
  }, [dev]);

  // In prod, observe visibility and add a safety timer to ensure mount
  useEffect(() => {
    if (dev) return;
    const el = containerRef.current;
    if (!el) return;

    let io: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (io) io.disconnect();
            io = null;
            break;
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.01 },
    );
    io.observe(el);

    const safety = window.setTimeout(() => setInView((v) => v || true), 1500);

    return () => {
      if (io) io.disconnect();
      clearTimeout(safety);
    };
  }, [dev]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gradient fallback while loading */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 600px at 50% 40%, rgba(122,92,230,0.32), rgba(23,234,217,0.18) 40%, rgba(0,0,0,0) 70%)',
          filter: 'saturate(1.35)',
        }}
      />

      {idleReady && inView && (
        <React.Suspense fallback={<div />}>
          {/* keep tiny fallback to avoid reflow */}
          <LazyHeroScene />
        </React.Suspense>
      )}
    </div>
  );
};

export default HeroShapes;
