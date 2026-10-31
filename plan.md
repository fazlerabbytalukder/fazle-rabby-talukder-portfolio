Build a static, single-page personal portfolio website for a Product Manager using Next.js (App Router, TypeScript). The design is dark, cinematic, and premium, with neon red/magenta and electric blue lighting, and rich scroll-based motion throughout.

TECH STACK

- Next.js 15 (App Router), TypeScript, static export (output: 'export')
- Tailwind CSS for styling
- Framer Motion for component and entrance animations
- GSAP + ScrollTrigger for pinned and scrubbed scroll animations
- Lenis for smooth scrolling (synced with GSAP ScrollTrigger)
- next/font for fonts, next/image for all images
- Data stored in /data/\*.ts files (stats, education, expertise, projects, experience, testimonials) so content is easy to edit

DESIGN SYSTEM

- Background: near-black (#06060A) with subtle vertical grid lines and soft radial glows
- Accent gradient: neon red/magenta (#FF2D55 → #E0115F) blending into electric blue (#2F6BFF → #1A3DFF)
- Text: white for headings, muted gray (#9A9AA5) for body copy
- Typography (three fonts):
  1. Tall condensed display font (Bebas Neue or Anton) for huge uppercase headlines like "FROM IDEA TO IMPACT", stat numbers and expertise titles
  2. Elegant italic serif (Instrument Serif or Playfair Display Italic) for accent words inside headings, e.g. "Bringing _Bring to Life_", "_Product Reality_", "_Since 2005_"
  3. Clean sans (Inter) for body text and UI
- Section headings mix regular sans + italic serif words in one line
- Cards: dark glass panels (bg-white/5, border-white/10, backdrop-blur), some with red-to-blue gradient fills
- Buttons: small pill-shaped outline buttons with uppercase text and a ↗ arrow icon; arrow moves diagonally on hover
- Max content width ~1200px, generous vertical spacing between sections

SECTIONS (in order)

1. Navbar
   - "LOGO" text on the left, pill "☰ MENU" button on the right
   - Transparent at top, becomes blurred dark glass after scrolling; hides on scroll down, reappears on scroll up
   - Menu opens a full-screen overlay with staggered large links

2. Hero
   - Giant condensed headline "FROM IDEA" on the left and "TO IMPACT" on the right, with a portrait photo centered between and behind the text, lit with red on one side and blue on the other
   - Below left: "Building Products at the Intersection of AI, _Creativity & Technology_" plus a short paragraph
   - "LET'S CONTACT ↗" pill button
   - Bottom right: circular rotating text badge "SCROLL DOWN • SCROLL DOWN •" with a down arrow in the middle
   - Animation: headline letters reveal upward with stagger (mask/clip reveal), portrait fades and scales from 1.1 to 1; on scroll, the headline halves drift apart horizontally and the portrait moves with parallax; rotating badge spins continuously

3. Stats + About
   - Left: staggered/checkerboard grid of square cards with big condensed numbers: "10+ Years of Experience", "25+ Products Launched", "$50M+ Revenue Impact", "20M+ Users Reached", "5 Industries Impacted". Some cards have red-to-blue gradient backgrounds, others are dark
   - Right: heading "From Product Vision to _Product Reality_", 3 paragraphs, one bold line "Transforming uncertainty into clear product direction.", a small rotating circular text badge, and a small portrait photo
   - Animation: numbers count up when in view; cards slide in with stagger from different directions; paragraphs fade up line by line

4. My Education
   - Centered heading "My _Education_" with subtitle
   - Three equal glass cards in a row: "B.S. in Computer Science", "M.S. Coursework in Machine Learning", "B.A. in Digital Video & Cinema", each with a short description
   - Animation: cards fade up with stagger; on hover, a gradient border glow follows the mouse

5. Areas of Expertise
   - Center: large glowing neon ring (red on one side, blue on the other) with sparks, with the heading "Areas of _Expertise_", a paragraph, and a "GET STARTED ↗" button inside
   - Four glass cards around the ring at the corners: "ARTIFICIAL INTELLIGENCE", "CREATIVE TECHNOLOGY", "USER EXPERIENCE", "PRODUCT STRATEGY", each with condensed title and short text
   - Build the ring with CSS (conic-gradient + blur + box-shadow) or SVG, not just an image
   - Animation: pin this section with GSAP; as the user scrolls, the ring scales up and rotates slowly while the four cards fly in from the corners; subtle pulsing glow

6. Products I've Helped Bring to Life
   - Heading "Products I've Helped _Bring to Life_", subtitle, and a "VIEW ALL ↗" button on the right
   - Three full-width project rows alternating image left/right:
     a. "AI Video Creation Platform" (laptop mockup image)
     b. "SaaS Workflow Platform" (laptop dashboard mockup)
     c. "AI Creative Assistant" (phone mockup)
   - Each row: small uppercase colored label (e.g. "AI VIDEO CREATION"), title, paragraph, 3 bullet results with + icons (e.g. "Increased adoption by 200%"), and a "VIEW CASE STUDY ↗" button
   - Text panels have a deep blue-to-magenta gradient background
   - Animation: image reveals with a clip-path wipe, then parallax inside its frame; text lines and bullets stagger in; image scales slightly on hover

7. Experience Timeline
   - Left: heading "Pushing Boundaries _Since 2005_", subtitle, then a vertical timeline with 3 entries: "CEO and Co-Founder", "Lead Product Manager", "Director of Product / Product Manager", each in italic serif with a small colored pill badge (date/company) and a short description; "GET STARTED ↗" button
   - Right: large dramatic portrait with red/blue lighting and a huge outlined "15+" number overlapping it
   - Animation: timeline line draws downward as you scroll (scrubbed); each dot lights up and its entry fades in when reached; "15+" scales and moves with parallax

8. Testimonials
   - Heading "What Our Clients Are Saying About Us", subtitle, round prev/next arrow buttons on the right
   - Horizontal carousel of cards (about 3.5 visible on desktop) that bleed off the right edge: quote icon, bold quote heading, short text, avatar, name, and role
   - Animation: draggable carousel (Framer Motion drag), smooth slide on arrow click, cards fade in with stagger

9. Final CTA
   - Huge outlined/faded condensed text "WHENEVER YOU ARE READY" in the background, with a portrait (sunglasses, red/blue light) in front
   - Left: "Lets Build Something _Meaningful Together_" plus a paragraph
   - Rotating circular "CONTACT ME" badge
   - Animation: background text moves horizontally on scroll (opposite directions per line, scrubbed); portrait rises up with parallax

10. Footer

- Large centered "LOGO", short paragraph
- Row of links: Home, Services, Experience, Projects, Reviews, Contact Us, Privacy Policy, Terms & Conditions
- Thin divider and "Copyright ©2026 My Product Management Portfolio. All rights reserved."

GLOBAL MOTION RULES

- Create reusable components: <Reveal> (fade + slide up on enter), <SplitText> (word/letter mask reveal), <CountUp>, <Parallax>, <RotatingBadge>, <MagneticButton>
- Use smooth easing (cubic-bezier(0.22, 1, 0.36, 1)) and durations around 0.8–1.2s
- Animate each element once when it enters the viewport (viewport={{ once: true, margin: "-100px" }})
- Add a thin gradient scroll progress bar at the top of the page
- Respect prefers-reduced-motion: disable parallax, pinning, and large movements and use simple fades instead
- Only animate transform and opacity for 60fps performance

RESPONSIVE

- Fully responsive: desktop, tablet, mobile
- On mobile: hero headline stacks above the portrait, stats grid becomes 2 columns, expertise cards stack below the ring (no pinning), project rows stack image above text, testimonials become a swipeable single-card carousel

PROJECT STRUCTURE
/app (layout.tsx, page.tsx, globals.css)
/components/sections (Hero, Stats, Education, Expertise, Projects, Experience, Testimonials, CTA, Footer, Navbar)
/components/motion (Reveal, SplitText, CountUp, Parallax, RotatingBadge, SmoothScroll)
/data (content files)
/public/images (placeholder images)

Use placeholder images (or Unsplash URLs) for portraits and device mockups, and use lorem ipsum where real copy isn't specified. Write clean, well-commented, production-ready code, and give me the full code for every file plus install and run commands.
