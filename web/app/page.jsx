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
      <div className="aurora" aria-hidden="true">
        <span className="b1" /><span className="b2" /><span className="b3" /><span className="b4" />
      </div>
      <Nav />
      <main className="relative z-10">
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
