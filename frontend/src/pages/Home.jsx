import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ChevronDown, Github, Linkedin, Twitter, Mail, 
  ExternalLink, Send, Coffee, MapPin, Briefcase 
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Tech stack items - AI/ML focused
const techStack = [
  'Python', 'FastAPI', 'PostgreSQL', 'LangChain', 'LangGraph', 
  'Azure AI', 'OpenAI', 'Docker', 'Multi-Agent Systems', 'Document Intelligence'
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hero Section
const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex flex-col items-center justify-center relative px-6"
      data-testid="hero-section"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.h1 
          variants={fadeInUp}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tighter leading-[1.05]"
        >
          <span className="gradient-text">Ayush Ranjan Roy</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-[#A8A8B4] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Building intelligent automation systems. Currently working on multi-agent orchestration 
          and document intelligence with Python, FastAPI, PostgreSQL, LangChain/LangGraph, and Azure AI.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/#projects">
            <Button 
              size="lg" 
              className="bg-[#00D4AA] hover:bg-[#5EEAD4] text-[#0A0A0F] font-medium px-8 py-3.5 text-base rounded-full transition-all duration-200 hover:scale-[1.02]"
            >
              View My Work
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
          <Link to="/blog">
            <Button 
              variant="outline"
              className="border-[#00D4AA] text-[#00D4AA] px-8 py-3.5 text-base rounded-full hover:bg-[#00D4AA]/10 transition-all"
              data-testid="hero-cta-blog"
            >
              Read Blog
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#5F5F6E]"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-24 md:py-32 px-6"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00D4AA]/20 to-[#7B61FF]/20 blur-2xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 glass-card">
                <img 
                  src="/images/profile.jpg" 
                  alt="Ayush Ranjan Roy - AI Engineer" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-[#12121A] to-[#1A1A24] flex items-center justify-center"><span class="font-unbounded text-6xl gradient-text">AR</span></div>';
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#E8E8ED] tracking-tight">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <div className="space-y-4 text-[#A8A8B4] leading-relaxed text-base">
              <p>
                I'm an AI Engineer at Accenture building production-grade automation systems. My work focuses 
                on multi-agent orchestration, document intelligence, and scalable LLM applications.
              </p>
              <p>
                I believe in clean architecture, reliable systems, and practical solutions that solve real problems. 
                Currently exploring distributed systems design and production ML patterns.
              </p>
              <p>
                <strong className="text-[#E8E8ED]">Currently Working On:</strong><br/>
                Multi-agent orchestration frameworks • Production-grade document intelligence pipelines • 
                Scalable LLM applications with enterprise requirements
              </p>
              <p>
                <strong className="text-[#E8E8ED]">Interests:</strong><br/>
                Coffee and exploring new places • Chess and strategic thinking • System design and architecture • 
                Open-source contributions
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-[#9494A0]">
                <Briefcase size={16} className="text-[#00D4AA]" />
                <span>AI Engineer at Accenture</span>
              </div>
              <div className="flex items-center gap-2 text-[#9494A0]">
                <MapPin size={16} className="text-[#00D4AA]" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-[#9494A0]">
                <Coffee size={16} className="text-[#00D4AA]" />
                <span>Coffee Enthusiast</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mt-16"
        >
          <h3 className="font-unbounded text-lg md:text-xl text-[#E8E8ED] mb-6 text-center">
            Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {techStack.map((tech) => (
              <span 
                key={tech} 
                className="tech-pill hover:border-[#00D4AA]/50 hover:text-[#00D4AA] cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'AI/ML', 'Full Stack'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section 
      id="projects" 
      ref={ref}
      className="py-24 md:py-32 px-6"
      data-testid="projects-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#E8E8ED] mb-12 text-center tracking-tight">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-[#9494A0] max-w-2xl mx-auto">
              A collection of projects showcasing my work in AI/ML and full-stack development.
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 space-y-4">
                  <div className="skeleton h-40 rounded-lg" />
                  <div className="skeleton h-6 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
              ))
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="project-card glass-card rounded-2xl overflow-hidden"
                  data-testid={`project-card-${project.id}`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image_url || 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
                    {project.featured && (
                      <span className="absolute top-3 right-3 badge-featured">Featured</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-unbounded text-lg text-[#E8E8ED] font-medium">
                      {project.title}
                    </h3>
                    <p className="text-[#9494A0] text-sm line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack?.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-[#9494A0]">
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack?.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-[#5F5F6E]">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#9494A0] hover:text-[#00D4AA] transition-colors"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.live_url && (
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#9494A0] hover:text-[#00D4AA] transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Just Saying Hi',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: 'Just Saying Hi', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:ayushranjanroy@gmail.com', label: 'Email' },
  ];

  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-24 md:py-32 px-6"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[#E8E8ED] mb-4 text-center tracking-tight">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-[#9494A0] max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a good conversation about AI and tech.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Message */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="glass-card p-8 rounded-2xl">
                <p className="text-[#9494A0] leading-relaxed mb-6">
                  Whether you have a project in mind, want to collaborate, or just want to say hi, 
                  feel free to reach out. I typically respond within 24 hours.
                </p>
                
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/5 border border-white/10 text-[#9494A0] hover:text-[#00D4AA] hover:border-[#00D4AA]/30 transition-all"
                      data-testid={`contact-social-${link.label.toLowerCase()}`}
                    >
                      <link.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6" data-testid="contact-form">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <Input
                    id="contact-name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    aria-required="true"
                    className="bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA] focus:ring-[#00D4AA]"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Your Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    aria-required="true"
                    className="bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA] focus:ring-[#00D4AA]"
                    data-testid="contact-email-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="sr-only">Subject</label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger id="contact-subject" className="bg-white/5 border-white/10 text-[#E8E8ED] focus:ring-[#00D4AA]" data-testid="contact-subject-select">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#12121A] border-white/10">
                      <SelectItem value="Job Opportunity">Job Opportunity</SelectItem>
                      <SelectItem value="Collaboration">Collaboration</SelectItem>
                      <SelectItem value="Just Saying Hi">Just Saying Hi</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <Textarea
                    id="contact-message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    aria-required="true"
                    rows={5}
                    className="bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA] focus:ring-[#00D4AA] resize-none"
                    data-testid="contact-message-input"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#00D4AA] text-[#0A0A0F] font-semibold py-6 rounded-full hover:bg-[#5EEAD4] transition-all glow-primary"
                  data-testid="contact-submit-button"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Home Page
export default function Home() {
  useEffect(() => {
    // Seed database on first load
    axios.post(`${API}/seed`).catch(() => {});
  }, []);

  return (
    <main id="main-content" className="relative">
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <ContactSection />
    </main>
  );
}
