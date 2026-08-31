export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  colSpan: string; // e.g. "md:col-span-7" or "md:col-span-5"
  aspectRatio: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featuredMetric?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  readTime: string;
  date: string;
  category: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  badgeType: 'google' | 'google-cloud' | 'anthropic' | 'microsoft' | 'forage';
  year: string;
  skillsCovered: string[];
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; highlight?: boolean; iconName?: string }[];
}

export interface ExplorationItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  rotation: string;
  speed: number;
  category: string;
}
