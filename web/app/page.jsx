import Nav from "@/components/Nav";
import Console from "@/components/Console";
import Work from "@/components/Work";
import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Page() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Console />
        <Work />
        <About />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
