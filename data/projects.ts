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
    "Production fintech products I've built the frontend for, from multi-role wallet platforms to AI-powered BNPL and EMI solutions.",
};

export const projects: Project[] = [
  {
    label: "Fintech Wallet · CodeCanyon Approved",
    title: "Qunzo – Fintech Wallet Platform",
    text: "A fintech wallet platform with User, Agent, Merchant, and Admin modules enabling digital payments, wallet transactions, and financial management through a secure web system.",
    results: [
      "Role: Front-End Developer (Web Application)",
      "Next.js, React.js & Tailwind CSS",
      "REST API integration & responsive UI",
    ],
    image: images.projectQunzo,
    imageAlt: "Qunzo CodeCanyon banner showing the wallet apps and admin panel",
    href: "https://qunzo-preview.tdevs.co/",
    panel: "force-dark bg-[linear-gradient(135deg,#0A0F2E_0%,#101a55_55%,#2a0d3d_100%)]",
  },
  {
    label: "AI-Powered BNPL & EMI",
    title: "Xanzu – BNPL & EMI Payment Solution",
    text: "An AI-powered \"Buy Now, Pay Later\" and EMI platform with Customer, Merchant, and Admin roles. The system enables credit-based purchasing, KYC verification, and virtual credit cards.",
    results: [
      "Role: Merchant Panel & Landing Page",
      "Next.js, React.js, Redux & RTK Query",
      "Tailwind CSS & REST API integration",
    ],
    image: images.projectXanzu,
    imageAlt: "Xanzu landing page for the AI-powered BNPL and EMI solution",
    href: "https://xanzu-preview.tdevs.co/",
    panel: "force-dark bg-[linear-gradient(135deg,#1a0b2e_0%,#4a0f3f_55%,#0d1a52_100%)]",
  },
];
