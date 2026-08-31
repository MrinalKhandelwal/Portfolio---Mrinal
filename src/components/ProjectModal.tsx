import { motion } from 'motion/react';
import { Project } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      id="project-modal-overlay"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-stroke rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto p-6 sm:p-8 text-text-primary"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary text-sm transition-colors z-20"
        >
          ✕
        </button>

        {/* Category & Title */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs text-[#89AACC] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-bg border border-stroke">
            {project.category}
          </span>
          {project.featuredMetric && (
            <span className="text-xs text-emerald-400 font-mono">
              &bull; {project.featuredMetric}
            </span>
          )}
        </div>

        <h2 className="text-3xl sm:text-4xl font-display italic text-text-primary mb-2">
          {project.title}
        </h2>
        <p className="text-sm text-muted mb-6">{project.tagline}</p>

        {/* Project Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-stroke">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
        </div>

        {/* Description */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs uppercase tracking-widest text-muted font-semibold">
            Architecture &amp; Engineering Details
          </h3>
          <p className="text-sm sm:text-base text-text-primary/90 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3">
            Technologies &amp; Frameworks
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-text-primary bg-bg px-3 py-1.5 rounded-full border border-stroke"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-stroke flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full accent-gradient text-black font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-[#89AACC]/20"
              >
                <span>Open Live Demo</span>
                <span>↗</span>
              </a>
            )}
            <a
              href={project.githubUrl || PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-full ${project.liveUrl ? 'bg-surface border border-stroke text-text-primary hover:bg-bg' : 'accent-gradient text-black font-semibold'} text-xs transition-colors flex items-center gap-1.5`}
            >
              <span>View Repository</span>
              <span>↗</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20regarding%20${encodeURIComponent(project.title)}`}
              className="px-5 py-2.5 rounded-full bg-surface border border-stroke text-xs text-text-primary hover:bg-bg transition-colors"
            >
              Discuss Project
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted hover:text-text-primary"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
