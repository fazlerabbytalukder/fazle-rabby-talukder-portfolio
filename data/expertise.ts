export type Expertise = {
  title: string;
  text: string;
  /** Desktop corner position around the ring (order must be TL, TR, BL, BR) */
  corner: string;
};

export const expertiseIntro = {
  title: "Areas of",
  titleAccent: "Expertise",
  body: "Fusce eu orci in quam euismod rutrum at sed neque. Aliquam non eros leo. Proin accumsan quam at amet arcu pharetra, sit amet tincidunt velit iaculis.",
};

export const expertise: Expertise[] = [
  {
    title: "Artificial Intelligence",
    text: "Mauris congue a mi eu varius. Vivamus consequat lacus quis nunc ultricies, at vehicula libero pharetra.",
    corner: "lg:left-0 lg:top-[12%]",
  },
  {
    title: "Creative Technology",
    text: "Mauris congue a mi eu varius. Vivamus consequat lacus quis nunc ultricies, at vehicula libero pharetra.",
    corner: "lg:right-0 lg:top-[12%] lg:text-right",
  },
  {
    title: "User Experience",
    text: "Mauris congue a mi eu varius. Vivamus consequat lacus quis nunc ultricies, at vehicula libero pharetra.",
    corner: "lg:left-0 lg:bottom-[12%]",
  },
  {
    title: "Product Strategy",
    text: "Mauris congue a mi eu varius. Vivamus consequat lacus quis nunc ultricies, at vehicula libero pharetra.",
    corner: "lg:right-0 lg:bottom-[12%] lg:text-right",
  },
];
