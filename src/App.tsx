import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import ResumeSkillsSection from './components/ResumeSkillsSection';
import StatsSection from './components/StatsSection';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import { Project } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);

  // Scroll spy for updating active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-[#4E85BF]/30 selection:text-white relative">
      {/* Section 1: Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Floating Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenResume={() => setIsResumeModalOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="w-full">
        {/* Section 2: Hero */}
        <Hero
          onSeeWorks={() => scrollToSection('works')}
          onReachOut={() => scrollToSection('contact')}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Section 3: Selected Works (Real Projects) */}
        <SelectedWorks onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 4: Skills, Certifications & Education (from Resume) */}
        <ResumeSkillsSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* Section 5: Stats */}
        <StatsSection />

        {/* Section 6: Contact / Footer */}
        <ContactFooter />
      </main>

      {/* Interactive Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isResumeModalOpen && (
          <ResumeModal
            isOpen={isResumeModalOpen}
            onClose={() => setIsResumeModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
