import { motion } from 'motion/react';
import { PERSONAL_INFO, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-stroke rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto p-6 sm:p-10 text-text-primary"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary text-base transition-colors z-20"
        >
          ✕
        </button>

        {/* Header with photo & personal info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-stroke/70">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-stroke shrink-0">
            <img
              src={PERSONAL_INFO.portrait}
              alt={PERSONAL_INFO.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary">
                {PERSONAL_INFO.name}
              </h2>
              <span className="text-xs text-[#89AACC] font-mono bg-[#89AACC]/10 px-2.5 py-0.5 rounded-full border border-[#89AACC]/20">
                B.Tech CSE (2025–2029 &bull; CGPA: {PERSONAL_INFO.cgpa})
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted">
              {PERSONAL_INFO.college} &bull; {PERSONAL_INFO.university}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted/90 pt-1 font-mono">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#89AACC]">
                ✉ {PERSONAL_INFO.email}
              </a>
              <span>☎ {PERSONAL_INFO.phone}</span>
              <span>📍 {PERSONAL_INFO.location}</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#89AACC]"
              >
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="py-6 border-b border-stroke/50">
          <h3 className="text-xs uppercase tracking-widest text-muted mb-2 font-semibold">
            Professional Summary
          </h3>
          <p className="text-xs sm:text-sm text-text-primary/90 leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>
        </div>

        {/* Experience & Simulation */}
        <div className="py-6 border-b border-stroke/50">
          <h3 className="text-xs uppercase tracking-widest text-muted mb-4 font-semibold">
            Experience &amp; Job Simulations
          </h3>
          <div className="bg-bg/60 border border-stroke rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <h4 className="text-sm font-semibold text-text-primary font-display italic text-base">
                Vista Equity Partners AI in Action Job Simulation &bull; Forage
              </h4>
              <span className="text-xs text-muted font-mono">22/08/2026</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-muted">
              <li className="flex items-start gap-2">
                <span className="text-[#89AACC]">&bull;</span>
                <span>
                  Completed a comprehensive job simulation involving prompt engineering and GenAI workflow automation for Vista&apos;s Portfolio Operations team.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#89AACC]">&bull;</span>
                <span>
                  Applied Vista&apos;s four-part prompt framework (Ask, Context, Examples, Desired Output) to synthesize customer NPS survey feedback into executive-ready insights, improving clarity and relevance of outputs by &gt;50% through iteration.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#89AACC]">&bull;</span>
                <span>
                  Designed and tested repeatable GenAI workflows for news aggregation, data reconciliation, and qualitative insight summarization using tools such as ChatGPT and Copilot, ensuring accuracy, professional tone, and scalability.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#89AACC]">&bull;</span>
                <span>
                  Evaluated AI-generated outputs for accuracy, tone, and usefulness; implemented guardrails and refinement techniques that reduced error rates and increased stakeholder usability of results.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="py-6 border-b border-stroke/50">
          <h3 className="text-xs uppercase tracking-widest text-muted mb-4 font-semibold">
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-bg/60 border border-stroke rounded-2xl">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-semibold text-text-primary">B.Tech, Computer Science Engineering</h4>
                <span className="text-xs text-[#89AACC] font-mono font-bold">2025 &ndash; 2029</span>
              </div>
              <p className="text-xs text-muted">Modern Institute of Technology and Research Centre (MITRC), Alwar</p>
              <p className="text-[11px] text-muted/70">Affiliated with Bikaner Technical University &bull; 3rd Sem CGPA: 8.48 &bull; Graduating 2029</p>
            </div>
            <div className="p-4 bg-bg/60 border border-stroke rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-text-primary">Secondary &amp; Senior Secondary</h4>
                <p className="text-xs text-muted">Alwar, Rajasthan</p>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-stroke/40 font-mono">
                <span>Class XII: <strong className="text-text-primary">83.2%</strong></span>
                <span>Class X: <strong className="text-text-primary">77.0%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="py-6 border-b border-stroke/50">
          <h3 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title} className="p-3 bg-bg/50 border border-stroke rounded-xl">
                <span className="text-muted font-semibold block mb-1">{cat.title}:</span>
                <span className="text-text-primary">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="py-6">
          <h3 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">
            Verified Certifications ({CERTIFICATIONS.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-2.5 bg-bg/50 border border-stroke/70 rounded-xl"
              >
                <span className="font-medium text-text-primary truncate mr-2">{cert.title}</span>
                <span className="text-[10px] text-[#89AACC] font-mono shrink-0 px-2 py-0.5 bg-surface rounded border border-stroke">
                  {cert.issuer}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-6 border-t border-stroke/70 flex flex-wrap items-center justify-between gap-4">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Inquiry%20-%20Mrinal%20Khandelwal`}
            className="px-6 py-2.5 rounded-full accent-gradient text-black font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            Contact for Opportunities
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-surface border border-stroke text-xs text-text-primary hover:bg-bg transition-colors"
          >
            Close Resume
          </button>
        </div>
      </motion.div>
    </div>
  );
}
