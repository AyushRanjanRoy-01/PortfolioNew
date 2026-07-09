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
      <Nav />
      <main>
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
