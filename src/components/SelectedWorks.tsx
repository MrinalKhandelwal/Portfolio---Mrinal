import { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
}

export default function SelectedWorks({ onSelectProject }: SelectedWorksProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="works" className="bg-bg py-16 md:py-24 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with Framer Motion scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading with italic styling */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary tracking-tight">
              Featured <span className="font-display italic text-[#89AACC]">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-lg mt-3">
              A curated selection of software systems, interactive interfaces, and GenAI workflows engineered from concept to production.
            </p>
          </div>

          {/* "View all work" button (desktop) */}
          <div className="hidden md:inline-flex">
            <button
              id="view-all-work-btn"
              type="button"
              onClick={() => onSelectProject(PROJECTS[0])}
              className="group relative inline-flex items-center justify-center rounded-full text-xs font-medium focus:outline-none"
            >
              <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 inline-flex items-center gap-2 bg-surface rounded-full px-5 py-2.5 text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300">
                <span>View all work</span>
                <span className="text-xs transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Bento Grid: 12 cols, alternating spans 7/5/5/7 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, index) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`${project.colSpan} relative group`}
              >
                <div
                  id={`project-card-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onSelectProject(project);
                    }
                  }}
                  className={`w-full ${project.aspectRatio} relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#89AACC]/50 transition-all duration-500`}
                >
                  {/* Background Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Halftone Overlay */}
                  <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

                  {/* Subtle Gradient Shade for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent pointer-events-none" />

                  {/* Top-Right Category Pill & Live Demo indicator */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    {project.liveUrl && (
                      <span className="text-[11px] font-semibold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
                        <span>Live on Vercel</span>
                      </span>
                    )}
                    <span className="text-[11px] font-medium uppercase tracking-wider text-text-primary/90 bg-surface/80 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Bottom Info Always Visible on Mobile / Default State */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-20">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-display italic text-text-primary">
                        {project.title}
                      </h3>
                      {project.featuredMetric && (
                        <span className="text-xs text-[#89AACC] font-mono">
                          &bull; {project.featuredMetric}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted line-clamp-1">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Hover Overlay Layer: bg-bg/70 + backdrop-blur-lg */}
                  <div
                    className={`absolute inset-0 bg-bg/85 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {/* Hover Label Pill with animated gradient border */}
                    <div className="relative group/btn mb-3">
                      <span className="absolute -inset-[1.5px] rounded-full accent-border-gradient animate-gradient-shift" />
                      <div className="relative z-10 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold flex items-center gap-2 shadow-lg">
                        <span>Explore —</span>
                        <span className="font-display italic text-sm text-black">
                          {project.title}
                        </span>
                        <span className="text-[10px]">↗</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted max-w-lg line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Direct Action Buttons on hover */}
                    <div className="flex items-center gap-2.5 mb-4" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3.5 py-1.5 rounded-full bg-[#89AACC]/20 text-[#89AACC] border border-[#89AACC]/40 hover:bg-[#89AACC] hover:text-black transition-colors font-medium"
                        >
                          Visit Live App ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3.5 py-1.5 rounded-full bg-surface border border-stroke text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors font-medium"
                        >
                          GitHub Repo ↗
                        </a>
                      )}
                    </div>

                    {/* Tags preview */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-md">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-muted/80 bg-stroke/60 px-2.5 py-0.5 rounded-full border border-stroke"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
