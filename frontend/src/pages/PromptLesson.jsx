import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { LessonSidebar } from '../components/LessonSidebar';
import { ExercisePanel } from '../components/ExercisePanel';
import { Button } from '../components/ui/button';
import { getLessonBySlug, getNextLesson, getPreviousLesson } from '../data/promptLessons';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const PromptLesson = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState([]);

  const lesson = getLessonBySlug(slug);
  const nextLesson = getNextLesson(slug);
  const previousLesson = getPreviousLesson(slug);

  useEffect(() => {
    // Load completed lessons from localStorage
    const saved = localStorage.getItem('completedPromptLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Scroll to top when lesson changes
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(slug)) {
      const updated = [...completedLessons, slug];
      setCompletedLessons(updated);
      localStorage.setItem('completedPromptLessons', JSON.stringify(updated));
    }
    
    if (nextLesson) {
      navigate(`/learn/${nextLesson.slug}`);
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#E8E8ED] mb-4">Lesson not found</h1>
          <Link to="/learn" className="text-[#00D4AA] hover:underline">
            Return to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex pt-11">
      {/* Sidebar */}
      <LessonSidebar completedLessons={completedLessons} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-[#6E6E73] text-sm mb-4">
              <BookOpen size={16} />
              <span>Prompt Engineering Tutorial</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#E8E8ED] mb-2 tracking-tight">
              {lesson.number > 0 && <span className="text-[#00D4AA]">Lesson {lesson.number}: </span>}
              {lesson.title}
            </h1>
          </motion.div>

          {/* Lesson Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {lesson.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                {section.heading && (
                  <h2 className="font-display text-2xl font-semibold text-[#E8E8ED] tracking-tight">
                    {section.heading}
                  </h2>
                )}
                {section.content && (
                  <p className="text-[#A8A8B4] text-base leading-relaxed">
                    {section.content}
                  </p>
                )}
                {section.codeExample && (
                  <div className="bg-[#12121A] border border-white/[0.08] rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm text-[#E8E8ED] font-mono whitespace-pre-wrap">
                      {section.codeExample}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Exercises */}
          {lesson.exercises && lesson.exercises.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <ExercisePanel 
                exercises={lesson.exercises}
                onComplete={nextLesson ? handleCompleteLesson : null}
              />
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mt-12 pt-8 border-t border-white/[0.08]"
          >
            <div>
              {previousLesson && (
                <Link to={`/learn/${previousLesson.slug}`}>
                  <Button
                    variant="outline"
                    className="border-white/[0.08] text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05]"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Previous
                  </Button>
                </Link>
              )}
            </div>
            <div>
              {nextLesson && (
                <Link to={`/learn/${nextLesson.slug}`}>
                  <Button className="bg-[#00D4AA] hover:bg-[#5EEAD4] text-[#0A0A0F] font-medium">
                    Next Lesson
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PromptLesson;
