export type Experience = {
  role: string;
  badge: string;
  /** Tailwind classes for the pill badge */
  badgeClass: string;
  text: string;
};

export const experienceIntro = {
  title: "Building Digital Experiences",
  titleAccent: "Since 2023",
  subtitle:
    "My journey in frontend development has been driven by a passion for building modern web applications, solving complex problems, and transforming ideas into meaningful digital experiences.",
  bigNumber: "3+",
};

export const experience: Experience[] = [
  {
    role: "Frontend Developer — Tdevs",
    badge: "DEC 2024 — PRESENT",
    badgeClass: "bg-neon/90 text-snow",
    text: "Building and maintaining production-grade SaaS and fintech applications using React.js, Next.js, and Tailwind CSS. Working on real-time dashboards, API integrations, and commercial web products.",
  },
  {
    role: "Frontend Developer — TechSuf",
    badge: "MAR 2023 — NOV 2024",
    badgeClass: "bg-magenta/90 text-snow",
    text: "Developed responsive web applications and implemented 50+ features across client projects. Collaborated with UI/UX teams and led the Theme Development Team.",
  },
  {
    role: "B.Sc. in Computer Science & Engineering",
    badge: "2018 — 2022",
    badgeClass: "bg-electric/90 text-snow",
    text: "Daffodil International University, Dhaka, Bangladesh. Built the academic foundation for my journey in software engineering and web development.",
  },
];
