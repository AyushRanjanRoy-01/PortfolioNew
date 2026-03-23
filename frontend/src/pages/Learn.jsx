import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Zap, Target, Brain, GraduationCap, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

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

const features = [
  {
    icon: Zap,
    title: 'Interactive Exercises',
    description: 'Learn by doing with hands-on prompt writing exercises and instant feedback'
  },
  {
    icon: Target,
    title: 'Progressive Curriculum',
    description: 'Start from basics and advance to complex techniques like chain-of-thought and few-shot learning'
  },
  {
    icon: Brain,
    title: 'Real-world Examples',
    description: 'Practice with practical scenarios you\'ll encounter in actual AI engineering work'
  }
];

const Learn = () => {
  return (
    <main className="min-h-screen pt-20 pb-24 px-6">
      <div className="max-w-[980px] mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-6">
            <BookOpen className="text-[#00D4AA]" size={40} />
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight text-[#E8E8ED]"
          >
            Learn <span className="gradient-text">Gen AI & Full-Stack Development</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-[#A8A8B4] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Master AI engineering through interactive tutorials and comprehensive resources.
            Start with Prompt Engineering - more topics coming soon!
          </motion.p>
        </motion.div>

        {/* Two Learning Paths */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Interactive Tutorial */}
          <motion.div
            variants={fadeInUp}
            className="glass-card p-8 rounded-lg border border-white/[0.08] hover:border-[#00D4AA]/30 transition-all group"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00D4AA]/10 mb-6">
              <GraduationCap className="text-[#00D4AA]" size={32} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#E8E8ED] mb-4 tracking-tight">
              Prompt Engineering Tutorial
            </h2>
            <p className="text-[#A8A8B4] mb-6 leading-relaxed">
              SQLBolt-style interactive learning with hands-on exercises, instant feedback, and progressive lessons. 
              Go from beginner to advanced in prompt engineering.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-[#A8A8B4]">
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-1">✓</span>
                <span>10 comprehensive lessons from basics to advanced</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-1">✓</span>
                <span>Interactive exercises with validation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-1">✓</span>
                <span>Hints and sample solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00D4AA] mt-1">✓</span>
                <span>Track your progress</span>
              </li>
            </ul>
            <Link to="/learn/introduction">
              <Button 
                className="w-full bg-[#00D4AA] hover:bg-[#5EEAD4] text-[#0A0A0F] font-medium py-3 rounded-lg transition-all group-hover:scale-[1.02]"
              >
                Start Tutorial
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>

          {/* Documentation */}
          <motion.div
            variants={fadeInUp}
            className="glass-card p-8 rounded-lg border border-white/[0.08] hover:border-[#7B61FF]/30 transition-all group"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#7B61FF]/10 mb-6">
              <Book className="text-[#7B61FF]" size={32} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#E8E8ED] mb-4 tracking-tight">
              Gen AI Resources
            </h2>
            <p className="text-[#A8A8B4] mb-6 leading-relaxed">
              Comprehensive documentation for full-stack Gen AI development. 
              Covers LLMs, RAG, vector databases, frameworks, and production best practices.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-[#A8A8B4]">
              <li className="flex items-start gap-2">
                <span className="text-[#7B61FF] mt-1">✓</span>
                <span>LangChain, LangGraph, and agent frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7B61FF] mt-1">✓</span>
                <span>Vector databases and embeddings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7B61FF] mt-1">✓</span>
                <span>RAG patterns and production deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#7B61FF] mt-1">✓</span>
                <span>Tools, libraries, and best practices</span>
              </li>
            </ul>
            <Link to="/learn/documentation">
              <Button 
                className="w-full bg-[#7B61FF] hover:bg-[#9B81FF] text-white font-medium py-3 rounded-lg transition-all group-hover:scale-[1.02]"
              >
                Browse Resources
                <Book className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass-card p-6 rounded-lg border border-white/[0.08] text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00D4AA]/10 mb-4">
                <feature.icon className="text-[#00D4AA]" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#E8E8ED] mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-[#A8A8B4] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* What You'll Learn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-8 rounded-lg border border-white/[0.08]"
        >
          <h2 className="font-display text-2xl font-semibold text-[#E8E8ED] mb-6 tracking-tight">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#A8A8B4]">
            <div className="flex items-start gap-3">
              <span className="text-[#00D4AA] mt-1">✓</span>
              <span>Writing clear, effective prompts</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00D4AA] mt-1">✓</span>
              <span>Using context and examples</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00D4AA] mt-1">✓</span>
              <span>Role-based prompting techniques</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00D4AA] mt-1">✓</span>
              <span>Formatting and structuring outputs</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00D4AA] mt-1">✓</span>
              <span>Chain-of-thought reasoning</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#00D4AA] mt-1">✓</span>
              <span>Advanced prompt optimization</span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Learn;
