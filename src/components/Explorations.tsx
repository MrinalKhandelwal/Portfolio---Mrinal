import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'motion/react';
import { EXPLORATION_ITEMS, PERSONAL_INFO } from '../data/portfolioData';
import { ExplorationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedCenterRef = useRef<HTMLDivElement | null>(null);
  const colLeftRef = useRef<HTMLDivElement | null>(null);
  const colRightRef = useRef<HTMLDivElement | null>(null);

  const [activeLightboxItem, setActiveLightboxItem] = useState<ExplorationItem | null>(null);

  const colLeftItems = EXPLORATION_ITEMS.filter((_, idx) => idx % 2 === 0);
  const colRightItems = EXPLORATION_ITEMS.filter((_, idx) => idx % 2 !== 0);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedCenterRef.current;
    const colLeft = colLeftRef.current;
    const colRight = colRightRef.current;

    if (!container || !pinned) return;

    const ctx = gsap.context(() => {
      // Pin center text
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false,
      });

      // Parallax movement for left column
      if (colLeft) {
        gsap.fromTo(
          colLeft,
          { y: 150 },
          {
            y: -250,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // Parallax movement for right column (offset speed)
      if (colRight) {
        gsap.fromTo(
          colRight,
          { y: 350 },
          {
            y: -350,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={containerRef}
      className="relative min-h-[260vh] sm:min-h-[300vh] bg-bg overflow-hidden border-t border-stroke/40"
    >
      {/* Layer 1: Pinned Center Layer (z-10) */}
      <div
        ref={pinnedCenterRef}
        className="w-full h-screen flex items-center justify-center pointer-events-none sticky top-0 z-10 px-6"
      >
        <div className="text-center max-w-xl mx-auto pointer-events-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-normal text-text-primary tracking-tight mb-4">
            Visual <span className="font-display italic text-[#89AACC]">playground</span>
          </h2>

          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto mb-8 leading-relaxed">
            Experiments in UI shaders, prompt structures, generative artifacts, and micro-interactions.
          </p>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-full text-xs font-medium focus:outline-none pointer-events-auto"
          >
            <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 inline-flex items-center gap-2 bg-surface/90 backdrop-blur-md rounded-full px-6 py-3 text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300">
              <span>View GitHub Lab</span>
              <span className="text-xs">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Floating Columns (z-20) */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 pointer-events-none">
        <div className="grid grid-cols-2 gap-6 sm:gap-12 md:gap-32 lg:gap-48 items-start">
          {/* Left Column */}
          <div ref={colLeftRef} className="flex flex-col gap-16 sm:gap-28 md:gap-40 items-start">
            {colLeftItems.map((item) => (
              <div
                key={item.id}
                id={`exploration-card-${item.id}`}
                onClick={() => setActiveLightboxItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveLightboxItem(item);
                  }
                }}
                className={`pointer-events-auto group relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden bg-surface border border-stroke/80 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-[#89AACC]/50 cursor-pointer ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] text-text-primary bg-bg/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-stroke font-mono">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm sm:text-base font-display italic text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted truncate">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div ref={colRightRef} className="flex flex-col gap-16 sm:gap-28 md:gap-40 items-end">
            {colRightItems.map((item) => (
              <div
                key={item.id}
                id={`exploration-card-${item.id}`}
                onClick={() => setActiveLightboxItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveLightboxItem(item);
                  }
                }}
                className={`pointer-events-auto group relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden bg-surface border border-stroke/80 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-[#89AACC]/50 cursor-pointer ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] text-text-primary bg-bg/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-stroke font-mono">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm sm:text-base font-display italic text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-muted truncate">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-lg"
            onClick={() => setActiveLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-stroke rounded-3xl overflow-hidden max-w-xl w-full relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-bg/80 backdrop-blur-md border border-stroke flex items-center justify-center text-text-primary hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>

              <div className="relative aspect-video sm:aspect-square w-full">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-surface">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#89AACC] font-semibold uppercase tracking-wider">
                    {activeLightboxItem.category}
                  </span>
                </div>
                <h3 className="text-2xl font-display italic text-text-primary mb-1">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-muted mb-4">{activeLightboxItem.subtitle}</p>
                <div className="flex justify-between items-center text-xs text-muted/80 pt-3 border-t border-stroke">
                  <span>Mrinal Khandelwal &bull; Creative Lab</span>
                  <button
                    type="button"
                    onClick={() => setActiveLightboxItem(null)}
                    className="text-text-primary hover:text-[#89AACC]"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
