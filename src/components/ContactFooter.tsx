import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function ContactFooter() {
  const footerVideoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Background HLS Video initialization (flipped vertically)
  useEffect(() => {
    const video = footerVideoRef.current;
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
        video.play().catch(() => {});
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

  // GSAP Marquee animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const marqueeText = "BUILDING THE FUTURE • ".repeat(10);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke/40"
    >
      {/* Background Video (Flipped Vertically with heavy overlay) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={footerVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-40"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-brightness-50" />
      </div>

      {/* GSAP Infinite Marquee Ribbon */}
      <div className="relative z-10 w-full overflow-hidden py-4 border-y border-stroke/40 bg-surface/30 backdrop-blur-sm mb-16 md:mb-20">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          <span className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-muted/70 mr-4">
            {marqueeText}
          </span>
          <span className="text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-muted/70">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Main Contact CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface/80 border border-stroke/70 backdrop-blur-md mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
          <span className="text-xs text-text-primary/90 font-medium">
            Open for Engineering Opportunities &amp; Internships
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight mb-6">
          Let&apos;s build something <br className="hidden sm:inline" />
          <span className="text-[#89AACC]">remarkable</span> together.
        </h2>

        <p className="text-sm sm:text-base text-muted max-w-lg mx-auto mb-10">
          Reach out directly to discuss software engineering, GenAI pipelines, fullstack systems, or innovative collaborations.
        </p>

        {/* Email CTA Button with Accent Gradient Ring */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="contact-email-btn"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="group relative inline-flex items-center justify-center rounded-full text-sm font-medium focus:outline-none"
          >
            {/* Gradient border ring on hover */}
            <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-surface text-text-primary font-medium border border-white/10 group-hover:border-transparent group-hover:bg-bg transition-all duration-300 shadow-2xl">
              <span className="font-mono text-xs sm:text-sm">{PERSONAL_INFO.email}</span>
              <span className="text-sm transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </span>
          </a>

          {/* Copy Button */}
          <button
            id="copy-email-btn"
            type="button"
            onClick={handleCopyEmail}
            className="text-xs text-muted hover:text-text-primary px-5 py-3 rounded-full bg-surface/50 border border-stroke/80 hover:bg-surface transition-all"
          >
            {copied ? '✓ Copied to clipboard!' : 'Copy Email'}
          </button>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 border-t border-stroke/40 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Status & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-stroke">
            <img
              src={PERSONAL_INFO.portrait}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-text-primary">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[11px] text-muted">
              MITRC Alwar &bull; B.Tech Computer Science &apos;29
            </div>
          </div>
        </div>

        {/* Center: Pulsing Dot & Availability */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface/60 border border-stroke/60 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle" />
          <span>{PERSONAL_INFO.status}</span>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-4 text-xs text-muted">
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            X (Twitter)
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="relative z-10 text-center mt-8 text-[11px] text-muted/60">
        &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Vite, Tailwind CSS, GSAP, Framer Motion &amp; HLS.js.
      </div>
    </footer>
  );
}
