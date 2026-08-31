import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onSeeWorks: () => void;
  onReachOut: () => void;
  onOpenResume: () => void;
}

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar", "GenAI Engineer"];

export default function Hero({ onSeeWorks, onReachOut, onOpenResume }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState<number>(0);

  // Background HLS Video initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(hlsSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay policy fallback
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Entrance Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.0, stagger: 0.12 },
        0.3
      );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Cycle role every 2s
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(roleTimer);
  }, []);

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 px-6 sm:px-10"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-75"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />
        
        {/* Subtle radial ambient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero Content (Centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow and Profile Pill */}
        <div className="blur-in inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface/70 border border-stroke/70 backdrop-blur-md">
          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20">
            <img
              src={PERSONAL_INFO.portrait}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            CLASS OF &apos;29 &bull; CS &amp; GENAI
          </span>
        </div>

        {/* Big Display Name */}
        <h1
          id="hero-name-heading"
          className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6"
        >
          {PERSONAL_INFO.name}
        </h1>

        {/* Role line with dynamic cycling */}
        <div className="blur-in text-lg sm:text-xl md:text-2xl text-muted font-light mb-4 flex items-center justify-center flex-wrap gap-1.5">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary text-xl sm:text-2xl md:text-3xl animate-role-fade-in inline-block px-1 font-semibold"
          >
            {ROLES[roleIndex]}
          </span>
        </div>

        {/* Bio description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed font-normal">
          Designing seamless digital interactions, high-performance software systems, and real-world Generative AI workflows that bring ideas to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-14">
          {/* Solid "See Works" Button */}
          <button
            id="hero-see-works-btn"
            type="button"
            onClick={onSeeWorks}
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            {/* Accent gradient ring on hover */}
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 px-7 py-3.5 rounded-full bg-text-primary text-bg font-semibold group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300">
              See Works
            </span>
          </button>

          {/* Outlined "Reach out..." Button */}
          <button
            id="hero-reach-out-btn"
            type="button"
            onClick={onReachOut}
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            {/* Accent gradient ring on hover */}
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 px-7 py-3.5 rounded-full border-2 border-stroke bg-bg/90 text-text-primary backdrop-blur-md group-hover:border-transparent group-hover:bg-surface transition-all duration-300">
              Reach out...
            </span>
          </button>

          {/* View Resume Pill */}
          <button
            id="hero-view-resume-pill"
            type="button"
            onClick={onOpenResume}
            className="text-xs text-muted hover:text-text-primary px-4 py-2 rounded-full border border-stroke/50 hover:border-stroke transition-colors flex items-center gap-1.5"
          >
            <span>Resume &bull; CGPA 8.48</span>
            <span>↗</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator (Bottom Center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] font-medium">
          SCROLL
        </span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="w-full h-1/2 bg-[#89AACC] animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
