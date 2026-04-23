'use client';

import { useEffect, useRef } from 'react';

export default function CursorFollower() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    // Cursor state
    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let ringScale = 1;
    let targetScale = 1;
    let raf: number;
    let isVisible = false;

    // Show cursors on first move
    const onFirstMove = () => {
      if (!isVisible) {
        dot.style.opacity  = '1';
        ring.style.opacity = '1';
        isVisible = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      onFirstMove();
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Hover detection — any interactive element
    const SELECTORS = 'a, button, [role="button"], label, input, textarea, select, [data-cursor]';

    const onMouseEnter = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(SELECTORS) as HTMLElement | null;
      if (!target) return;

      // Magnetic: pull ring to element center
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;

      // Expand ring to roughly wrap the element
      const size = Math.max(rect.width, rect.height, 44);
      targetScale = size / 30; // 30px is base ring size

      ring.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.2s, border-color 0.2s';
      ring.style.borderColor = 'rgba(255,255,255,0.6)';
      dot.style.opacity = '0';
    };

    const onMouseLeave = () => {
      targetScale = 1;
      ring.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.2s, border-color 0.3s';
      ring.style.borderColor = 'rgba(255,255,255,0.35)';
      dot.style.opacity = '1';
    };

    // Add listeners via event delegation
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter as EventListener);
    document.addEventListener('mouseout',  onMouseLeave as EventListener);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Dot: exact
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // Ring: lerp with lag
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ringScale = lerp(ringScale, targetScale, 0.12);

      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter as EventListener);
      document.removeEventListener('mouseout',  onMouseLeave as EventListener);
    };
  }, []);

  return (
    <>
      {/* Small dot — follows exactly */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 5, height: 5,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 30, height: 30,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.35)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
