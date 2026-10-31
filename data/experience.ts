export type Experience = {
  role: string;
  badge: string;
  /** Tailwind classes for the pill badge */
  badgeClass: string;
  text: string;
};

export const experienceIntro = {
  title: "Pushing Boundaries",
  titleAccent: "Since 2005",
  subtitle:
    "A selection of products and initiatives that illustrate how I approach product leadership, customer discovery, execution, and growth.",
  bigNumber: "15+",
};

export const experience: Experience[] = [
  {
    role: "CEO and Co-Founder",
    badge: "2020 — Present",
    badgeClass: "bg-neon/90 text-snow",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem felis.",
  },
  {
    role: "Lead Product Manager",
    badge: "2014 — 2020",
    badgeClass: "bg-magenta/90 text-snow",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem felis.",
  },
  {
    role: "Director of Product / Product Manager",
    badge: "2005 — 2014",
    badgeClass: "bg-electric/90 text-snow",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lorem felis.",
  },
];
