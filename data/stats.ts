export type Stat = {
  value: string;
  label: string;
  /** Red-to-blue gradient fill instead of dark glass */
  gradient?: boolean;
  /** Direction the card slides in from */
  from: "left" | "right" | "up" | "down";
  /** Desktop placement inside the 3×3 checkerboard grid */
  place: string;
};

export const stats: Stat[] = [
  { value: "10+", label: "Years of Experience", gradient: true, from: "left", place: "lg:col-start-1 lg:row-start-1" },
  { value: "25+", label: "Products Launched", from: "down", place: "lg:col-start-2 lg:row-start-1" },
  { value: "$50M+", label: "Revenue Impact", from: "left", place: "lg:col-start-1 lg:row-start-2" },
  { value: "20M+", label: "Users Reached", gradient: true, from: "right", place: "lg:col-start-3 lg:row-start-2" },
  { value: "5", label: "Industries Impacted", from: "up", place: "lg:col-start-2 lg:row-start-3" },
];
