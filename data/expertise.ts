export type Expertise = {
  title: string;
  text: string;
  /** Desktop corner position around the ring (order must be TL, TR, BL, BR) */
  corner: string;
};

export const expertiseIntro = {
  title: "Areas of",
  titleAccent: "Expertise",
  body: "I specialize in building modern web experiences that combine clean code, thoughtful design, and powerful functionality. From SaaS platforms to fintech solutions, I turn complex ideas into scalable, user-friendly applications.",
};

export const expertise: Expertise[] = [
  {
    title: "FRONTEND ENGINEERING",
    text: "Building modern, scalable web applications using React.js, Next.js, JavaScript, and Tailwind CSS.",
    corner: "lg:left-0 lg:top-[12%]",
  },
  {
    title: "SAAS & FINTECH DEVELOPMENT",
    text: "Developing production-ready SaaS platforms, fintech applications, dashboards, and complex transaction workflows.",
    corner: "lg:right-0 lg:top-[12%] lg:text-right",
  },
  {
    title: "USER EXPERIENCE & INTERFACES",
    text: "Creating responsive, intuitive, and accessible user interfaces with a strong focus on usability and performance.",
    corner: "lg:left-0 lg:bottom-[12%]",
  },
  {
    title: "PRODUCT DEVELOPMENT",
    text: "Turning ideas into real-world products through API integration, state management, reusable components, and scalable frontend architecture.",
    corner: "lg:right-0 lg:bottom-[12%] lg:text-right",
  },
];
