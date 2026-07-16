import Ambient from "@/components/Ambient";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechBrands from "@/components/TechBrands";
import SiteBrain from "@/components/SiteBrain";
import AgentGraph from "@/components/AgentGraph";
import Journey from "@/components/Journey";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Ambient />
      <ScrollProgress />
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <TechBrands />
        <SiteBrain />
        <AgentGraph />
        <Journey />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
