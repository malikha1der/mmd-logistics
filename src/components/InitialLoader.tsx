import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

interface InitialLoaderProps {
  onFinish?: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      onFinish?.();
      return;
    }

    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 120);

    // Fade out after completion
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const closeTimer = setTimeout(() => {
        setIsVisible(false);
        onFinish?.();
      }, 400);
      return () => clearTimeout(closeTimer);
    }, 950);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading MMD Logistics"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#061025] text-white transition-opacity duration-400 ease-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center z-10 px-6 max-w-sm w-full text-center">
        {/* Animated Truck Icon in Glowing Hex/Pill Ring */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 p-0.5 shadow-xl shadow-blue-900/40">
            <div className="w-full h-full bg-[#0a1838] rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Highway speed lines animation */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.15)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]" />
              <Truck className="w-10 h-10 text-white motion-safe:animate-bounce" />
            </div>
          </div>
          {/* Subtle radar pulse ring */}
          <div className="absolute inset-0 rounded-2xl border border-blue-400/40 animate-ping opacity-30" />
        </div>

        {/* Large Prominent MMD Wordmark */}
        <div className="mb-2">
          <h1 className="text-4xl sm:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 font-sans">
            MMD
          </h1>
          <p className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-blue-400 mt-1">
            LOGISTICS LLC
          </p>
        </div>

        <p className="text-xs text-slate-400 font-mono tracking-wide mb-6">
          INTERSTATE FREIGHT TRANSPORTATION
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 sm:w-56 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3 border border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          MC 1178290 · USDOT 3535101
        </span>
      </div>
    </div>
  );
};
