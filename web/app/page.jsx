import Ambient from "@/components/Ambient";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechBrands from "@/components/TechBrands";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Journey from "@/components/Journey";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Ambient />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <TechBrands />
        <Work />
        <Experience />
        <Journey />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
