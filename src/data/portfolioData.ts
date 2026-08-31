import { Project, Certification, SkillCategory } from '../types';

import portraitImg from '../assets/images/mrinal_portrait_1788190406275.jpg';
import pantrypalImg from '../assets/images/pantrypal_preview_1788192876682.jpg';
import vistaCertificateImg from '../assets/images/vista_certificate_1788201458789.jpg';

export const PERSONAL_INFO = {
  name: "Mrinal Khandelwal",
  initials: "MK",
  role: "Computer Science & GenAI Engineer",
  email: "iammrinalkhandelwal@gmail.com",
  phone: "+91 7424820720",
  location: "Alwar, Rajasthan, India",
  college: "Modern Institute of Technology and Research Centre (MITRC), Alwar",
  university: "Bikaner Technical University",
  degree: "B.Tech in Computer Science and Engineering",
  btechYears: "2025 – 2029",
  gradYear: "2029",
  cgpa: "8.48 (3rd Semester)",
  summary: "B.Tech Computer Science Engineering student (2025–2029) skilled in C, C++, JavaScript, React.js, Python, MySQL and DSA, with a strong interest in software engineering, web development, and Generative AI. Experienced in applying AI tools and prompt engineering to real-world business tasks.",
  linkedin: "https://linkedin.com/in/mrinal-khandelwal2008",
  github: "https://github.com/mrinalkhandelwal",
  twitter: "https://x.com/MrinalKhandelw3",
  portrait: portraitImg,
  status: "Available for projects & internships",
};

export const ROTATING_HERO_ROLES = [
  "Creative Engineer",
  "Fullstack Developer",
  "GenAI Specialist",
  "Problem Solver",
  "CS Scholar",
];

export const PROJECTS: Project[] = [
  {
    id: "pantrypal",
    title: "PantryPal",
    category: "Fullstack AI Web Application",
    tagline: "Smart kitchen pantry inventory manager & AI-driven recipe generation platform",
    description: "PantryPal is an intelligent fullstack pantry management and culinary recommendation system engineered to eliminate food waste and automate household grocery tracking. Features live ingredient inventory synchronization, automated shelf-life tracking and expiration alerts, smart dietary restriction filtering, and dynamic AI recipe synthesis based on ingredients already available in your kitchen.",
    image: pantrypalImg,
    colSpan: "md:col-span-12",
    aspectRatio: "aspect-[16/9] md:aspect-[21/9]",
    tags: ["React", "TypeScript", "Tailwind CSS", "Generative AI", "Inventory Management", "Vercel", "REST APIs"],
    featuredMetric: "Live on Vercel • Zero Food Waste Engine",
    githubUrl: "https://github.com/mrinalkhandelwal/pantrypal",
    liveUrl: "https://pantrypal-silk-three.vercel.app/",
  },
  {
    id: "vista-ai-workflows",
    title: "Vista Equity GenAI Automation Suite",
    category: "Enterprise AI & Prompt Systems",
    tagline: "Structured prompt frameworks & automated executive feedback synthesis",
    description: "Developed during the Vista Equity Partners AI in Action simulation. Engineered reproducible multi-step GenAI pipelines using the 4-part prompt framework (Ask, Context, Examples, Desired Output) to transform raw customer NPS streams into executive-ready strategic summaries, reducing ambiguity and improving output accuracy by >50%.",
    image: vistaCertificateImg,
    colSpan: "md:col-span-12",
    aspectRatio: "aspect-[16/9] md:aspect-[21/9]",
    tags: ["Prompt Engineering", "GenAI Pipelines", "Executive Analytics", "ChatGPT / Copilot", "Quality Guardrails"],
    featuredMetric: "+50% Insight Clarity • Forage Certified",
    githubUrl: "https://github.com/mrinalkhandelwal",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "C++", level: 90, highlight: true },
      { name: "C", level: 85, highlight: false },
      { name: "JavaScript (ES6+)", level: 92, highlight: true },
      { name: "Python", level: 80, highlight: false },
    ],
  },
  {
    title: "Web & Frontend",
    skills: [
      { name: "React.js", level: 92, highlight: true },
      { name: "Tailwind CSS", level: 95, highlight: true },
      { name: "HTML5 & Semantic Web", level: 95, highlight: false },
      { name: "CSS3 & Custom Motion", level: 90, highlight: false },
    ],
  },
  {
    title: "Databases & Core CS",
    skills: [
      { name: "Data Structures & Algorithms", level: 88, highlight: true },
      { name: "Object-Oriented Programming (OOP)", level: 90, highlight: true },
      { name: "MySQL", level: 84, highlight: false },
      { name: "Problem Solving & Logic", level: 92, highlight: true },
    ],
  },
  {
    title: "Generative AI & Tools",
    skills: [
      { name: "Prompt Engineering (4-Part Framework)", level: 96, highlight: true },
      { name: "Generative AI Tools & Workflows", level: 94, highlight: true },
      { name: "Power BI", level: 75, highlight: false },
      { name: "Git & Version Control", level: 88, highlight: false },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "google-ai-fund",
    title: "AI Fundamentals",
    issuer: "Google",
    badgeType: "google",
    year: "2026",
    skillsCovered: ["Machine Learning Basics", "Neural Architectures", "AI Ethics"],
  },
  {
    id: "gcp-innovating-ai",
    title: "Innovating with Google Cloud Artificial Intelligence",
    issuer: "Google Cloud",
    badgeType: "google-cloud",
    year: "2026",
    skillsCovered: ["Vertex AI", "Cloud Infrastructure", "Enterprise AI Deployment"],
  },
  {
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    badgeType: "anthropic",
    year: "2026",
    skillsCovered: ["Claude Model Capabilities", "System Prompts", "Context Window Utilization"],
  },
  {
    id: "google-prompting-essentials",
    title: "Google Prompting Essentials",
    issuer: "Google",
    badgeType: "google",
    year: "2026",
    skillsCovered: ["Few-Shot Prompting", "Chain of Thought", "Iterative Refinement"],
  },
  {
    id: "gcp-beyond-chatbot",
    title: "Gen AI: Beyond the Chatbot",
    issuer: "Google Cloud",
    badgeType: "google-cloud",
    year: "2026",
    skillsCovered: ["Agentic Workflows", "Function Calling", "RAG Patterns"],
  },
  {
    id: "vista-equity-forage",
    title: "Vista Equity Partners AI in Action Simulation",
    issuer: "Forage & Vista Equity",
    badgeType: "forage",
    year: "2026",
    skillsCovered: ["Executive NPS Synthesis", "Guardrail Enforcement", "Workflow Automation"],
  },
  {
    id: "google-ai-data",
    title: "AI for Data Analysis",
    issuer: "Google",
    badgeType: "google",
    year: "2026",
    skillsCovered: ["Predictive Analytics", "Data Modeling", "Visualization"],
  },
  {
    id: "google-ai-writing",
    title: "AI for Writing and Communicating",
    issuer: "Google",
    badgeType: "google",
    year: "2026",
    skillsCovered: ["Executive Summaries", "Tone Calibration", "Structured Briefings"],
  },
  {
    id: "google-ai-research",
    title: "AI for Research and Insights",
    issuer: "Google",
    badgeType: "google",
    year: "2026",
    skillsCovered: ["Information Extraction", "Cross-Reference Validation", "Deep Analysis"],
  },
  {
    id: "msft-ai-managers",
    title: "AI for Managers",
    issuer: "Microsoft & LinkedIn Learning",
    badgeType: "microsoft",
    year: "2026",
    skillsCovered: ["Strategic AI Implementation", "ROI Assessment", "Change Leadership"],
  },
];

export const STATS = [
  {
    value: "8.48",
    suffix: " CGPA",
    label: "Academic Excellence",
    detail: "B.Tech Computer Science (MITRC, BTU)",
  },
  {
    value: "10",
    suffix: "+",
    label: "AI & Tech Certifications",
    detail: "Google AI, Cloud, Anthropic & Microsoft",
  },
  {
    value: "20",
    suffix: "+",
    label: "Core Projects & Simulations",
    detail: "Fullstack, C++, DSA & AI Workflows",
  },
  {
    value: "100",
    suffix: "%",
    label: "Commitment to Craft",
    detail: "Clean code, precision UI & prompt logic",
  },
];
