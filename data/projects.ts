import { images } from "./images";

export type Project = {
  label: string;
  title: string;
  text: string;
  results: string[];
  image: string;
  imageAlt: string;
  href: string;
  /** Tailwind gradient for the text panel */
  panel: string;
};

export const projectsIntro = {
  title: "Products I've Helped",
  titleAccent: "Bring to Life",
  subtitle:
    "A selection of products and initiatives that illustrate how I approach product leadership, customer discovery, execution, and growth.",
};

export const projects: Project[] = [
  {
    label: "AI Video Creation",
    title: "AI Video Creation Platform",
    text: "Nam porttitor a nulla sit amet porta. Nam non accumsan leo. Aenean erat augue, interdum eget semper aliquet, condimentum ut nulla.",
    results: ["Increased adoption by 200%", "Reduced onboarding friction", "Accelerated retention growth"],
    image: images.projectVideo,
    imageAlt: "Laptop showing a video creation interface",
    href: "#",
    panel: "force-dark bg-[linear-gradient(135deg,#0A0F2E_0%,#101a55_55%,#2a0d3d_100%)]",
  },
  {
    label: "SaaS Workflow",
    title: "SaaS Workflow Platform",
    text: "Nam porttitor a nulla sit amet porta. Nam non accumsan leo. Aenean erat augue, interdum eget semper aliquet, condimentum ut nulla.",
    results: ["New revenue stream", "Improved activation", "Reduced churn"],
    image: images.projectSaas,
    imageAlt: "Analytics dashboard on a laptop",
    href: "#",
    panel: "force-dark bg-[linear-gradient(135deg,#1a0b2e_0%,#4a0f3f_55%,#0d1a52_100%)]",
  },
  {
    label: "AI Assistant App",
    title: "AI Creative Assistant",
    text: "Nam porttitor a nulla sit amet porta. Nam non accumsan leo. Aenean erat augue, interdum eget semper aliquet, condimentum ut nulla.",
    results: ["Increased engagement", "Faster time-to-value", "Improved retention"],
    image: images.projectAssistant,
    imageAlt: "Smartphone running an assistant app",
    href: "#",
    panel: "force-dark bg-[linear-gradient(135deg,#0A0F2E_0%,#132066_50%,#3d0b33_100%)]",
  },
];
