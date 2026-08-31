import { motion } from 'motion/react';
import { STATS } from '../data/portfolioData';

export default function StatsSection() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              id={`stat-block-${index}`}
              className="bg-surface/40 border border-stroke rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-stroke/90 hover:bg-surface/70 transition-all duration-300 group"
            >
              <div>
                <span className="text-xs text-muted uppercase tracking-widest block mb-4">
                  0{index + 1} &bull; Metric
                </span>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-display italic text-text-primary tracking-tight group-hover:text-white transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-2xl sm:text-3xl font-display text-[#89AACC] font-semibold ml-1">
                    {stat.suffix}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stroke/50">
                <h3 className="text-sm font-semibold text-text-primary mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
