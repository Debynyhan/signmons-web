// Hero background: lazy-mount the heavy 3D scene after idle to keep TBT low
import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const LazyHeroScene = React.lazy(() => import('../three/HeroScene'));

const HeroShapes: React.FC = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('md')); // keep responsive re-render without local usage
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle =
      (window as any).requestIdleCallback?.(() => setReady(true)) ||
      setTimeout(() => setReady(true), 600);
    return () => {
      if (typeof idle === 'number') clearTimeout(idle as number);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {ready && (
        <React.Suspense fallback={null}>
          <LazyHeroScene />
        </React.Suspense>
      )}
    </div>
  );
};

export default HeroShapes;
