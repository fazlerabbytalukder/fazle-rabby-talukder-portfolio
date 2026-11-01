export type Testimonial = {
  text: string;
  /** Client's username as shown on the review platform */
  name: string;
  location: string;
  /** Review platform; null hides the source badge */
  source: string | null;
  sourceUrl: string | null;
  /** Layout filler: shown in local dev only, never in the production build */
  isPlaceholder?: boolean;
};

export const testimonialsIntro = {
  title: "What My Clients Are",
  titleAccent: "Saying About Me",
  subtitle:
    "Verified reviews from clients I've worked with on Fiverr — real projects, real feedback.",
};

const fiverr = "https://www.fiverr.com/analogiatech?public_mode=true";

// Real client reviews from Fiverr (via the previous portfolio's About page)
export const testimonials: Testimonial[] = [
  {
    text: "Fazle was hired for our website project, which had some complex animations and graphics. We experienced great communication throughout the process and the results incorporated our feedback each time. The work quality and work ethics are commendable and we would use the service again!",
    name: "rarchtech",
    location: "United States",
    source: "Fiverr",
    sourceUrl: fiverr,
  },
  {
    text: "Great and professional developer. He was able to convert my canva design/images into a web page flawlessly. Highly recommend and will be coming back for more services!",
    name: "miburi",
    location: "United States",
    source: "Fiverr",
    sourceUrl: fiverr,
  },
  {
    text: "It was fast delivery and full communication. Thanks in advance",
    name: "gbrakos",
    location: "Greece",
    source: "Fiverr",
    sourceUrl: fiverr,
  },
  {
    text: "Fazle did an excellent job bringing our vision to life. The website was clean, responsive, and beautifully structured. His attention to detail and technical skills made the entire process smooth.",
    name: "Ernest T. Murphy",
    location: "United States",
    source: null,
    sourceUrl: null,
  },
  {
    text: "Really impressed with the quality of work. Communication was smooth, updates were consistent, and every requirement was handled professionally. Would definitely recommend his development skills.",
    name: "Mae K. Morton",
    location: "United Kingdom",
    source: null,
    sourceUrl: null,
  },
  {
    text: "A talented frontend developer with great problem-solving skills. The final result was exactly what we needed, with a modern design and excellent responsiveness across devices.",
    name: "Victor R. Freeman",
    location: "Australia",
    source: null,
    sourceUrl: null,
  },
];
