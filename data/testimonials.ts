import { images } from "./images";

export type Testimonial = {
  heading: string;
  text: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonialsIntro = {
  title: "What Our Clients Are",
  titleAccent: "Saying About Us",
  subtitle:
    "Nam porttitor a nulla sit amet porta. Nam non accumsan leo. Aenean erat augue, interdum eget semper aliquet, condimentum ut nulla.",
};

const text =
  "Able to balance strategy, execution, and stakeholder alignment exceptionally well.";

export const testimonials: Testimonial[] = [
  { heading: "One of the strongest product thinkers I've worked with.", text, name: "Martha Conroy", role: "Former Associate", avatar: images.avatars[0] },
  { heading: "Consistently brought clarity to complex product challenges.", text, name: "George Matthews", role: "Former Associate", avatar: images.avatars[1] },
  { heading: "One of the strongest product thinkers I've worked with.", text, name: "Jennifer Holden", role: "Former Associate", avatar: images.avatars[2] },
  { heading: "Turned a vague idea into a product customers loved.", text, name: "Daniel Brooks", role: "VP Engineering", avatar: images.avatars[3] },
  { heading: "A rare mix of vision, empathy and relentless execution.", text, name: "Christina James", role: "Head of Design", avatar: images.avatars[4] },
  { heading: "Our roadmap finally made sense to everyone in the room.", text, name: "Sofia Bennett", role: "Founder", avatar: images.avatars[5] },
];
