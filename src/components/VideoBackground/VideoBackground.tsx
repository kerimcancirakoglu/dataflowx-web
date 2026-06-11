'use client';

import { useEffect, useRef } from 'react';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface VideoBackgroundProps {
  videoSrc?: string;
  opacity?: number;
  playMode?: 'scrub' | 'play';
}

export default function VideoBackground({ 
  videoSrc = "/dynamic-particle-flow.mp4", 
  opacity = 0.45,
  playMode = 'scrub'
}: VideoBackgroundProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playMode === 'play') {
      if (video) {
        video.loop = true;
        video.play().catch(e => console.warn("AutoPlay failed:", e));
      }
      return;
    }

    let targetTime = 0;
    let smoothTime = 0;
    let rafHandle: number | null = null;
    let isReady = false;
    let isPriming = false; // ← çakışma önleyici flag

    const computeTarget = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      targetTime = progress * video.duration;
    };

    const tick = () => {
      if (isReady && video.duration) {
        smoothTime = lerp(smoothTime, targetTime, 0.08);
        const delta = Math.abs(video.currentTime - smoothTime);
        if (delta > 0.033) {
          try {
            video.currentTime = smoothTime;
          } catch (_) {}
        }
      }
      rafHandle = requestAnimationFrame(tick);
    };

    const primeVideo = async () => {
      if (isReady || isPriming) return;
      isPriming = true;

      try {
        video.muted = true;
        video.volume = 0;
        
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch (err) {
        console.warn('[Video] play() failed:', err);
      }

      isReady = true;
      isPriming = false;
      computeTarget();
      smoothTime = targetTime;
    };

    const onScroll = () => computeTarget();

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isReady) {
        computeTarget();
        smoothTime = targetTime;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Tek bir event handler — removeEventListener ile temizle
    const onVideoReady = () => {
      video.removeEventListener('loadeddata', onVideoReady);
      video.removeEventListener('canplay', onVideoReady);
      video.removeEventListener('canplaythrough', onVideoReady);
      primeVideo();
    };

    if (video.readyState >= 2) {
      primeVideo();
    } else {
      video.addEventListener('loadeddata', onVideoReady);
      video.addEventListener('canplay', onVideoReady);
      video.addEventListener('canplaythrough', onVideoReady);
    }

    computeTarget();
    smoothTime = targetTime;
    rafHandle = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener('loadeddata', onVideoReady);
      video.removeEventListener('canplay', onVideoReady);
      video.removeEventListener('canplaythrough', onVideoReady);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        preload="auto"
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: opacity,
          display: 'block',
          transform: 'translateZ(0)',
          willChange: 'transform',
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
