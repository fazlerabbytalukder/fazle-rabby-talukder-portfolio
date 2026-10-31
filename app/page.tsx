import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Education from "@/components/sections/Education";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Education />
        <Expertise />
        <Projects />
        <Experience />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
