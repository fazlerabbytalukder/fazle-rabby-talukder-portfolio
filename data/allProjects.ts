/** Full project archive for the /projects page (migrated from the previous portfolio). */

export type ProjectCategory = "official" | "personal" | "template";

export type ArchiveProject = {
  title: string;
  category: ProjectCategory;
  /** Company or client the work was done for */
  client: string;
  overview: string;
  tech: string[];
  image: string;
  live?: string;
  github?: string;
  /** Transparent mockups are shown whole instead of cropped */
  contain?: boolean;
};

export const projectFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "official", label: "Official" },
  { value: "personal", label: "Personal" },
  { value: "template", label: "PSD to HTML" },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  official: "Official Project",
  personal: "Personal Project",
  template: "PSD to HTML",
};

export const allProjectsIntro = {
  eyebrow: "Project Archive",
  title: "Everything I've",
  titleAccent: "Designed & Built",
  subtitle:
    "From production fintech platforms at Tdevs to full-stack Next.js side projects and pixel-perfect HTML templates — a complete look at my work.",
};

const img = (file: string) => `/images/projects/${file}`;

export const allProjects: ArchiveProject[] = [
  {
    title: "Qunzo – Fintech Wallet Platform",
    category: "official",
    client: "Tdevs",
    overview:
      "A fintech wallet platform with User, Agent, Merchant, and Admin modules enabling digital payments, wallet transactions, and financial management through a secure web system. CodeCanyon approved.",
    tech: ["Next.js", "React.js", "Tailwind CSS", "REST API"],
    image: img("qunzo-preview.jpg"),
    // Wide banner — cropping to the card's ratio would cut off the headline
    contain: true,
    live: "https://qunzo-preview.tdevs.co/",
  },
  {
    title: "Xanzu – BNPL & EMI Payment Solution",
    category: "official",
    client: "Tdevs",
    overview:
      "An AI-powered \"Buy Now, Pay Later\" and EMI platform with Customer, Merchant, and Admin roles — credit-based purchasing, KYC verification, and virtual credit cards. I built the Merchant Panel and Landing Page.",
    tech: ["Next.js", "Redux", "RTK Query", "Tailwind CSS"],
    image: img("xanzu-live.png"),
    live: "https://xanzu-preview.tdevs.co/",
  },
  {
    title: "Temporix – Coworking Space",
    category: "official",
    client: "Tdevs",
    overview: "A coworking space website with multi-location support, tour booking, and membership plans.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    image: img("temporix.png"),
    live: "https://temporix-preview.tdevs.co/",
  },
  {
    title: "BP – Social Media Website",
    category: "official",
    client: "Bangladeshi Professionals",
    overview:
      "A dynamic social media website with user profiles, news feeds, messaging, and interactive elements — a responsive, engaging interface built from the ground up.",
    tech: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
    image: img("bp-social.png"),
    live: "https://www.bangladeshiprofessionals.com/",
  },
  {
    title: "Chaudri CPA",
    category: "official",
    client: "Chaudri CPA",
    overview: "Website template for a tax and accounting services firm in NYC. I was responsible for the full template design and build.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    image: img("chaudricpa.png"),
    live: "https://www.chaudricpa.com/",
  },
  {
    title: "Pirala Agency Website",
    category: "official",
    client: "Pirala",
    overview:
      "A versatile, professional website for a technology-focused agency, blending sleek aesthetics with robust functionality and an intuitive interface.",
    tech: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
    image: img("pirala.png"),
    live: "https://www.pirala.com/",
  },
  {
    title: "ACU Learn",
    category: "personal",
    client: "Personal",
    overview: "An EdTech platform where teachers offer courses and students purchase and learn the subjects they're interested in.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    image: img("acu-learn.png"),
    live: "https://acu-learn.vercel.app/",
    github: "https://github.com/fazlerabbytalukder/acu-learn-nextjs-14",
  },
  {
    title: "ImaginifyAI",
    category: "personal",
    client: "Personal",
    overview:
      "A full-stack AI SaaS platform with Stripe and Cloudinary — generative fill, background removal, object recolor, object removal, and image restore.",
    tech: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    image: img("imaginify-ai.png"),
    live: "https://ai-saas-app-ashy-eight.vercel.app/",
    github: "https://github.com/fazlerabbytalukder/AI-Saas_App",
  },
  {
    title: "Stay Swift",
    category: "personal",
    client: "Personal",
    overview:
      "A hotel booking platform — search by destination, dates, and amenities, then browse available hotels with prices and reviews.",
    tech: ["Next.js", "MongoDB", "Tailwind CSS"],
    image: img("stay-swift.png"),
    live: "https://stay-swift-nextjs-14.vercel.app/",
    github: "https://github.com/fazlerabbytalukder/stay-swift-nextjs-14",
  },
  {
    title: "Khana Khazana",
    category: "personal",
    client: "Personal",
    overview: "A recipe platform for food enthusiasts — a comprehensive cooking tutorial site built with Next.js 14.",
    tech: ["Next.js 14", "MongoDB", "Tailwind CSS"],
    image: img("khana-khazana.png"),
    live: "https://khana-khazana-2ydg.vercel.app",
    github: "https://github.com/fazlerabbytalukder/Khana-Khazana",
  },
  {
    title: "Craft With Comfort",
    category: "personal",
    client: "Personal",
    overview:
      "A furniture store with a curated collection of stylish, functional pieces for every room — from timeless classics to modern designs.",
    tech: ["React.js", "Node.js", "MongoDB", "Tailwind CSS"],
    image: img("craft-with-comfort.jpg"),
    live: "https://craft-comfort.web.app/",
    github: "https://github.com/fazlerabbytalukder/craft-comfort-client-site",
  },
  {
    title: "OroDigital Agency Template",
    category: "template",
    client: "HopeThemes",
    overview:
      "A digital agency template where creativity meets innovation — strategic layouts for web design, development, and marketing services.",
    tech: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
    image: img("oro-digital.png"),
    live: "https://bootstrap-template.themez.io/orodigital/",
  },
  {
    title: "TechPulseX Agency Template",
    category: "template",
    client: "HopeThemes",
    overview:
      "A versatile, professional template for technology-focused agencies and web development firms, with sleek aesthetics and a user-friendly interface.",
    tech: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
    image: img("techpulse.png"),
    live: "https://bootstrap-template.themez.io/tech-pulse-x/",
  },
  {
    title: "Toury – Travel Agency Template",
    category: "template",
    client: "HopeThemes",
    overview: "A travel agency template for showcasing tour packages and destinations with a clean, responsive layout.",
    tech: ["HTML", "CSS", "Bootstrap 5", "JavaScript"],
    image: img("toury.png"),
  },
];
