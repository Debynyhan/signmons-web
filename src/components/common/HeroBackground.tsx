// Hero background: lazy-mount the heavy 3D scene after idle to keep TBT low
import React, { useEffect, useRef, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const LazyHeroScene = React.lazy(() => import('../three/HeroScene'));

const HeroShapes: React.FC = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('md')); // keep responsive re-render without local usage
  const [idleReady, setIdleReady] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const idle =
      (window as any).requestIdleCallback?.(() => setIdleReady(true)) ||
      setTimeout(() => setIdleReady(true), 600);
    return () => {
      if (typeof idle === 'number') clearTimeout(idle as number);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
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
            'radial-gradient(1200px 600px at 50% 40%, rgba(122,92,230,0.18), rgba(23,234,217,0.08) 40%, rgba(0,0,0,0) 70%)',
          filter: 'saturate(1.2)',
        }}
      />

      {idleReady && inView && (
        <React.Suspense fallback={<div />}>
          {' '}
          {/* keep tiny fallback to avoid reflow */}
          <LazyHeroScene />
        </React.Suspense>
      )}
    </div>
  );
};

export default HeroShapes;
