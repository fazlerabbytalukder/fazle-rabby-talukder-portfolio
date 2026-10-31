/**
 * All image sources in one place.
 * Swap any Unsplash URL for a local file, e.g. "/images/hero.jpg" (place it in /public/images).
 */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  heroPortrait: unsplash("photo-1507003211169-0a1dd7228f2d", 1400),
  aboutPortrait: unsplash("photo-1500648767791-00dcc994a43e", 500),
  experiencePortrait: unsplash("photo-1506794778202-cad84cf45f1d", 1400),
  ctaPortrait: unsplash("photo-1492562080023-ab3db95bfbce", 1400),
  projectVideo: unsplash("photo-1496181133206-80ce9b88a853", 1600),
  projectSaas: unsplash("photo-1551288049-bebda4e38f71", 1600),
  projectAssistant: unsplash("photo-1511707171634-5f897ff02aa9", 1600),
  avatars: [
    unsplash("photo-1494790108377-be9c29b29330", 160),
    unsplash("photo-1472099645785-5658abf4ff4e", 160),
    unsplash("photo-1438761681033-6461ffad8d80", 160),
    unsplash("photo-1519085360753-af0119f7cbe7", 160),
    unsplash("photo-1544005313-94ddf0286df2", 160),
    unsplash("photo-1534528741775-53994a69daeb", 160),
  ],
};
