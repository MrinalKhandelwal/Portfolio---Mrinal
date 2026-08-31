import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ["Design", "Create", "Inspire", "Engineer"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Counter using requestAnimationFrame over ~2700ms
  useEffect(() => {
    const duration = 2700;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing curve (ease-out-cubic for smooth deceleration)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeProgress * 100);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        setIsFinished(true);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Cycle rotating words every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  // 400ms delay after reaching 100 before calling onComplete
  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onComplete]);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none overflow-hidden"
    >
      {/* Top Left Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-3"
      >
        <span className="w-2 h-2 rounded-full bg-[#89AACC] animate-ping" />
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
          Portfolio &bull; Mrinal Khandelwal
        </span>
      </motion.div>

      {/* Center Rotating Words */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div className="h-20 sm:h-28 md:h-36 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary/85"
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="text-xs sm:text-sm text-muted mt-2 tracking-widest uppercase">
          Computer Science &bull; Generative AI
        </p>
      </div>

      {/* Bottom Row: Counter and Details */}
      <div className="w-full flex items-end justify-between">
        <div className="text-xs text-muted/70 tracking-wider hidden sm:block">
          Alwar, India &bull; Class of &apos;26
        </div>

        {/* Big Counter Display */}
        <div className="ml-auto flex items-baseline">
          <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tighter leading-none">
            {String(count).padStart(3, "0")}
          </span>
          <span className="text-xl sm:text-2xl font-display text-muted/60 ml-1">%</span>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50 overflow-hidden">
        <div
          className="h-full accent-gradient transition-transform duration-75 origin-left ease-out"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 12px rgba(137, 170, 204, 0.45)',
          }}
        />
      </div>
    </motion.div>
  );
}
