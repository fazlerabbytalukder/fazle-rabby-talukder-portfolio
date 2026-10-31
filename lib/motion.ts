/** Shared motion tokens used by Framer Motion components. */

/** Premium "expo-out" easing used across the site */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Animate once when the element is ~100px inside the viewport */
export const VIEWPORT = { once: true, margin: "-100px" } as const;
