import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILL_CATEGORIES, CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData';

interface ResumeSkillsSectionProps {
  onOpenResumeModal: () => void;
}

export default function ResumeSkillsSection({ onOpenResumeModal }: ResumeSkillsSectionProps) {
  const [activeTab, setActiveTab] = useState<'skills' | 'certifications' | 'education'>('skills');

  return (
    <section id="skills" className="bg-bg py-16 md:py-24 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Expertise &bull; Credentials
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary tracking-tight">
              Skills &amp; <span className="font-display italic text-[#89AACC]">certifications</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-lg mt-3">
              Comprehensive technical foundation in C++, React.js, DSA, and verified AI credentials from Google, Anthropic, and Microsoft.
            </p>
          </div>

          {/* Quick Resume trigger button */}
          <div className="flex items-center gap-3">
            <button
              id="skills-view-resume-btn"
              type="button"
              onClick={onOpenResumeModal}
              className="group relative inline-flex items-center justify-center rounded-full text-xs font-medium focus:outline-none"
            >
              <span className="absolute -inset-[1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 inline-flex items-center gap-2 bg-surface rounded-full px-5 py-2.5 text-text-primary border border-stroke group-hover:border-transparent transition-all duration-300">
                <span>View Complete Resume</span>
                <span className="text-xs">↗</span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            id="tab-btn-skills"
            type="button"
            onClick={() => setActiveTab('skills')}
            className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'skills'
                ? 'bg-text-primary text-bg font-semibold'
                : 'text-muted hover:text-text-primary bg-surface border border-stroke/60'
            }`}
          >
            Technical Skills ({SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)})
          </button>
          <button
            id="tab-btn-certifications"
            type="button"
            onClick={() => setActiveTab('certifications')}
            className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'certifications'
                ? 'bg-text-primary text-bg font-semibold'
                : 'text-muted hover:text-text-primary bg-surface border border-stroke/60'
            }`}
          >
            Verified Certifications ({CERTIFICATIONS.length})
          </button>
          <button
            id="tab-btn-education"
            type="button"
            onClick={() => setActiveTab('education')}
            className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 ${
              activeTab === 'education'
                ? 'bg-text-primary text-bg font-semibold'
                : 'text-muted hover:text-text-primary bg-surface border border-stroke/60'
            }`}
          >
            Education &amp; Job Simulation
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'skills' && (
            <motion.div
              key="tab-skills"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {SKILL_CATEGORIES.map((category, idx) => (
                <div
                  key={category.title}
                  id={`skill-cat-${idx}`}
                  className="bg-surface/60 border border-stroke rounded-3xl p-6 sm:p-8 hover:border-stroke/90 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-text-primary font-display italic">
                      {category.title}
                    </h3>
                    <span className="text-[11px] text-muted uppercase tracking-wider bg-bg px-2.5 py-1 rounded-full border border-stroke/60">
                      {category.skills.length} competencies
                    </span>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between text-xs sm:text-sm mb-1.5">
                          <span className="text-text-primary flex items-center gap-2">
                            {skill.name}
                            {skill.highlight && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                            )}
                          </span>
                          <span className="text-muted text-xs font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stroke/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              skill.highlight ? 'accent-gradient' : 'bg-muted/50'
                            }`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'certifications' && (
            <motion.div
              key="tab-certs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {CERTIFICATIONS.map((cert) => {
                const badgeColor =
                  cert.badgeType === 'google'
                    ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                    : cert.badgeType === 'google-cloud'
                    ? 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
                    : cert.badgeType === 'anthropic'
                    ? 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                    : cert.badgeType === 'microsoft'
                    ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                    : 'border-purple-500/30 text-purple-400 bg-purple-500/10';

                return (
                  <div
                    key={cert.id}
                    id={`cert-card-${cert.id}`}
                    className="bg-surface/50 border border-stroke rounded-2xl p-5 hover:border-[#89AACC]/40 hover:bg-surface transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeColor}`}
                        >
                          {cert.issuer}
                        </span>
                        <span className="text-[11px] text-muted font-mono">{cert.year}</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-medium text-text-primary mb-2 line-clamp-2">
                        {cert.title}
                      </h4>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cert.skillsCovered.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] text-muted/90 bg-bg px-2 py-0.5 rounded border border-stroke/50"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stroke/40 flex items-center justify-between text-[11px] text-muted">
                      <span className="flex items-center gap-1.5 text-text-primary/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Verified Credential
                      </span>
                      <span className="text-[#89AACC]">Official ↗</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              key="tab-edu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* College Education Card */}
              <div className="bg-surface/60 border border-stroke rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs uppercase tracking-widest text-[#89AACC] font-semibold">
                      Undergraduate Degree
                    </span>
                    <span className="text-xs text-muted font-mono">2024 &ndash; 2028</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-1">
                    {PERSONAL_INFO.degree}
                  </h3>
                  <p className="text-sm text-text-primary/80 font-medium mb-1">
                    {PERSONAL_INFO.college}
                  </p>
                  <p className="text-xs text-muted mb-4">
                    Affiliated with {PERSONAL_INFO.university} &bull; Alwar, Rajasthan
                  </p>

                  <div className="bg-bg/80 border border-stroke rounded-2xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">Academic Standing</span>
                      <span className="text-sm font-semibold text-text-primary">
                        3rd Sem CGPA: <span className="text-[#89AACC] font-bold">8.48</span>
                      </span>
                    </div>
                  </div>

                  {/* Schooling */}
                  <div className="space-y-2 pt-2 border-t border-stroke/40">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Class XII (Senior Secondary)</span>
                      <span className="font-semibold text-text-primary font-mono">83.2%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">Class X (Secondary)</span>
                      <span className="font-semibold text-text-primary font-mono">77.0%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vista Equity Simulation Card */}
              <div className="bg-surface/60 border border-stroke rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                      Experience &amp; Simulation
                    </span>
                    <span className="text-xs text-muted font-mono">Completed Aug 2026</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display italic text-text-primary mb-1">
                    Vista Equity Partners AI in Action
                  </h3>
                  <p className="text-sm text-text-primary/80 font-medium mb-3">
                    Portfolio Operations Simulation on Forage
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
                    <li className="flex items-start gap-2">
                      <span className="text-[#89AACC] mt-0.5">&bull;</span>
                      <span>
                        Applied Vista&apos;s 4-part framework (Ask, Context, Examples, Desired Output) to synthesize NPS survey feedback, improving executive insight clarity by &gt;50%.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#89AACC] mt-0.5">&bull;</span>
                      <span>
                        Architected repeatable GenAI workflows for news aggregation, data reconciliation, and qualitative summary generation with ChatGPT and Copilot.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#89AACC] mt-0.5">&bull;</span>
                      <span>
                        Enforced output validation guardrails and refinement iterations to minimize error rates for stakeholder deliverables.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-stroke/40 flex items-center justify-between">
                  <span className="text-xs text-muted">Prompt Automation</span>
                  <span className="text-xs font-semibold text-[#89AACC]">Forage Verified</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
