import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Circle, Zap, Target, Award, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { promptLessons } from '../data/promptLessons';

const difficultyConfig = {
  'Easy': { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', icon: Target },
  'Medium': { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', icon: Zap },
  'Hard': { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30', icon: Zap },
  'Expert': { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', icon: Award }
};

export const LessonSidebar = ({ completedLessons = [] }) => {
  const { slug } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = completedLessons.length;
  const totalLessons = promptLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  // Close menu when lesson changes
  useEffect(() => {
    setIsOpen(false);
  }, [slug]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-6 z-50 p-3 rounded-full bg-[#00D4AA] hover:bg-[#5EEAD4] text-[#0A0A0F] shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Toggle lesson menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sliding Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-[#0A0A0F] border-l border-white/[0.08] shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Close button inside */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-lg font-semibold text-[#E8E8ED] tracking-tight">
                  📚 Lessons
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  <X size={20} className="text-[#A8A8B4]" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-display text-sm font-semibold text-[#E8E8ED] mb-3 tracking-tight">
                  🚀 Your Progress
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A8A8B4]">Completed</span>
                    <span className="text-[#00D4AA] font-semibold">{completedCount}/{totalLessons}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#12121A] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00D4AA] to-[#5EEAD4] transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
              <nav className="space-y-2">
                {promptLessons.map((lesson) => {
                  const isActive = lesson.slug === slug;
                  const isCompleted = completedLessons.includes(lesson.slug);
                  const diffConfig = difficultyConfig[lesson.difficulty] || difficultyConfig['Easy'];
                  
                  return (
                    <Link
                      key={lesson.id}
                      to={`/learn/${lesson.slug}`}
                      className={`group block px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/30'
                          : 'border border-transparent hover:border-white/[0.08] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2 size={18} className="text-[#00D4AA]" />
                          ) : (
                            <Circle size={18} className="opacity-30" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium truncate ${
                            isActive ? 'text-[#00D4AA]' : 'text-[#E8E8ED] group-hover:text-[#00D4AA]'
                          }`}>
                            {lesson.title}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${diffConfig.bg} ${diffConfig.color} ${diffConfig.border}`}>
                              {lesson.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
