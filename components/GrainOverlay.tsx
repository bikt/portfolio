'use client';

import { useEffect, useRef } from 'react';

// ISO 3200 film grain — 2px chunks, opacity 0.1, 60fps flicker
// Playground values: intensity=18, speed=100, scale=25, vignette=off
export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d')!;

    const GRAIN_SIZE   = 2;      // scale=25 → 2px per grain pixel
    const OPACITY      = 0.1;    // layer opacity
    const DENSITY      = 0.032;  // intensity=18 → ~3.2% bright grains
    const UPDATE_EVERY = 1;      // speed=100 → every frame (60fps flicker)

    let raf: number;
    let frame = 0;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function render() {
      const w = Math.ceil(canvas.width  / GRAIN_SIZE);
      const h = Math.ceil(canvas.height / GRAIN_SIZE);

      offscreen.width  = w;
      offscreen.height = h;

      const img = offCtx.createImageData(w, h);
      const d   = img.data;

      for (let i = 0; i < d.length; i += 4) {
        const v        = Math.random();
        const isBright = v > (1 - DENSITY);
        const brightness = isBright
          ? Math.floor(120 + Math.random() * 135)
          : Math.floor(Math.random() * 25);

        d[i]     = brightness;
        d[i + 1] = brightness;
        d[i + 2] = brightness;
        d[i + 3] = brightness > 0 ? Math.min(255, brightness * 1.8) : 0;
      }

      offCtx.putImageData(img, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = OPACITY;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    function tick() {
      frame++;
      if (frame % UPDATE_EVERY === 0) render();
      raf = requestAnimationFrame(tick);
    }

    resize();
    render();
    raf = requestAnimationFrame(tick);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}
