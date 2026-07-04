import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Page() {
  return (
    <>
      <div className="brand-glow" aria-hidden="true" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
