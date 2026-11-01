/**
 * All image sources in one place.
 * Swap any Unsplash URL for a local file, e.g. "/images/hero.jpg" (place it in /public/images).
 */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Background removed — transparent PNG cut-out
  heroPortrait: "/images/hero-portrait.png",
  // Same photo with a smile (AI-edited expression, pixel-aligned to heroPortrait) — crossfaded in the hero
  heroPortraitSmile: "/images/hero-portrait-smile.png",
  aboutPortrait: "/images/about.png",
  // Background removed — transparent PNG cut-out
  experiencePortrait: "/images/exp.png",
  ctaPortrait: "/images/footer.jpg",
  // CodeCanyon preview banner (590×300 is the largest Envato serves)
  projectQunzo: "/images/projects/qunzo-preview.jpg",
  // Full-page screenshot of the live preview site
  projectXanzu: "/images/projects/xanzu-live.png",
  projectTemporix: "/images/projects/temporix.png",
  avatars: [
    unsplash("photo-1494790108377-be9c29b29330", 160),
    unsplash("photo-1472099645785-5658abf4ff4e", 160),
    unsplash("photo-1438761681033-6461ffad8d80", 160),
    unsplash("photo-1519085360753-af0119f7cbe7", 160),
    unsplash("photo-1544005313-94ddf0286df2", 160),
    unsplash("photo-1534528741775-53994a69daeb", 160),
  ],
};
