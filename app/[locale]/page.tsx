import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { About, Contact, Education, Experience, Footer, Marquee, Projects, Skills } from "@/components/Sections";
import { Cursor, ScrollProgress } from "@/components/Effects";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
