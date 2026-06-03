'use client';

import { useEffect, useRef } from 'react';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let targetTime = 0;
    let smoothTime = 0;
    let rafHandle: number | null = null;
    let started = false;

    // ── Scroll: sadece targetTime'ı güncelle ─────────────────────────────────
    const onScroll = () => {
      if (!video.duration) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetTime = progress * video.duration;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // ── Saf RAF döngüsü ───────────────────────────────────────────────────────
    // RVFC kullanılmıyor — RVFC sadece video yeni frame render ettiğinde tetiklenir.
    // Video pause + seek yoksa callback asla ateşlenmez → loop ölür.
    // RAF saniyede sabit 60 kez çalışır, loop ölmez.
    const tick = () => {
      smoothTime = lerp(smoothTime, targetTime, 0.15);
      if (Math.abs(video.currentTime - smoothTime) > 0.001) {
        video.currentTime = smoothTime;
      }
      rafHandle = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafHandle !== null) return;
      onScroll();
      rafHandle = requestAnimationFrame(tick);
    };

    // ── Primer: decoder'ı uyandırmak için play→pause ──────────────────────────
    const prime = () => {
      if (started) return;
      video
        .play()
        .then(() => {
          started = true;
          video.pause();
          video.currentTime = 0;
          smoothTime = 0;
          startLoop();
        })
        .catch(() => {
          // autoplay engellendi — gesture fallback'ler retry eder
        });
    };

    if (video.readyState >= 1) prime();
    video.addEventListener('loadedmetadata', prime, { once: true });
    video.addEventListener('canplay', prime, { once: true });

    const onGesture = () => {
      if (!started) prime();
    };
    window.addEventListener('pointerdown', onGesture, { once: true });
    window.addEventListener('keydown', onGesture, { once: true });
    window.addEventListener('scroll', onGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
      window.removeEventListener('scroll', onGesture);
      if (rafHandle !== null) cancelAnimationFrame(rafHandle);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <video
        ref={videoRef}
        src="/dynamic-particle-flow.mp4"
        poster="/Kapak/New-Project-2025-08-02T043719.908.jpg"
        preload="auto"
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.35, // <-- Opacity buradan ayarlanır
          display: 'block',
          transform: 'translateZ(0)',
          willChange: 'transform', // 'contents' geçersiz değerdi
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
