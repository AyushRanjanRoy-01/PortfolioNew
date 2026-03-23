import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle, Lightbulb, Eye, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const ExercisePanel = ({ exercises, onComplete }) => {
  const [userInputs, setUserInputs] = useState({});
  const [showHints, setShowHints] = useState({});
  const [showSolutions, setShowSolutions] = useState({});
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [currentFocus, setCurrentFocus] = useState(0);
  const exerciseRefs = useRef({});

  // Auto-validate as user types (debounced)
  const handleInputChange = (exerciseId, value, exercise, index) => {
    setUserInputs(prev => ({ ...prev, [exerciseId]: value }));
    
    // Auto-validate if input has content
    if (value.trim().length > 10) {
      validateAnswer(exercise, value, index);
    }
  };

  const validateAnswer = (exercise, userInput, exerciseIndex) => {
    if (!userInput || userInput.trim().length < 10) return;

    const lowerInput = userInput.toLowerCase();
    
    // Check if meets all criteria
    const meetsAllCriteria = exercise.criteria.every(criterion => {
      const lowerCriterion = criterion.toLowerCase();
      
      // Extract keywords from criterion
      if (lowerCriterion.includes('includes') || lowerCriterion.includes('mentions')) {
        const keywords = lowerCriterion.match(/"([^"]+)"/g);
        if (keywords) {
          return keywords.some(keyword => {
            const cleanKeyword = keyword.replace(/"/g, '').toLowerCase();
            return lowerInput.includes(cleanKeyword);
          });
        }
      }
      
      if (lowerCriterion.includes('specifies') || lowerCriterion.includes('requests')) {
        const keywords = lowerCriterion.match(/\b(format|json|table|list|bullet|numbered|structure|audience|context|role)\b/gi);
        if (keywords) {
          return keywords.some(keyword => lowerInput.includes(keyword.toLowerCase()));
        }
      }
      
      return true;
    });

    if (meetsAllCriteria && !completedExercises.has(exercise.id)) {
      // Mark as completed
      setCompletedExercises(prev => new Set([...prev, exercise.id]));
      
      // Auto-scroll to next exercise after a short delay
      setTimeout(() => {
        const nextIndex = exerciseIndex + 1;
        if (nextIndex < exercises.length) {
          setCurrentFocus(nextIndex);
          const nextRef = exerciseRefs.current[exercises[nextIndex].id];
          if (nextRef) {
            nextRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 800);
    }
  };

  const toggleHint = (exerciseId) => {
    setShowHints(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const toggleSolution = (exerciseId) => {
    setShowSolutions(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };

  const allCompleted = exercises.every(ex => completedExercises.has(ex.id));
  const completedCount = completedExercises.size;
  const progressPercentage = (completedCount / exercises.length) * 100;

  return (
    <div className="space-y-8">
      <div className="border-t border-white/[0.08] pt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-2xl font-semibold text-[#E8E8ED] tracking-tight">
              Practice Time! 🚀
            </h2>
            <span className="text-sm text-[#A8A8B4]">
              {completedCount} / {exercises.length} completed
            </span>
          </div>
          <div className="w-full h-2 bg-[#12121A] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00D4AA] to-[#5EEAD4] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          {exercises.map((exercise, index) => {
            const isCompleted = completedExercises.has(exercise.id);
            const isCurrent = currentFocus === index;
            
            return (
              <div
                key={exercise.id}
                ref={el => exerciseRefs.current[exercise.id] = el}
                className={`glass-card p-6 rounded-lg border transition-all duration-300 ${
                  isCompleted 
                    ? 'border-[#00D4AA]/30 bg-[#00D4AA]/5' 
                    : isCurrent
                    ? 'border-[#00D4AA]/50 shadow-lg shadow-[#00D4AA]/10'
                    : 'border-white/[0.08]'
                }`}
              >
                {/* Task */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle2 size={28} className="text-[#00D4AA]" />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-[#00D4AA]/10 text-[#00D4AA] flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <p className={`text-base flex-1 ${
                    isCompleted ? 'text-[#00D4AA]' : 'text-[#E8E8ED]'
                  }`}>
                    {exercise.task}
                  </p>
                </div>

                {/* Input Area */}
                <div className="relative">
                  <textarea
                    value={userInputs[exercise.id] || ''}
                    onChange={(e) => handleInputChange(exercise.id, e.target.value, exercise, index)}
                    placeholder={exercise.placeholder}
                    disabled={isCompleted}
                    className={`w-full bg-[#12121A] border rounded-lg p-4 text-[#E8E8ED] text-sm font-mono focus:outline-none transition-colors resize-none ${
                      isCompleted 
                        ? 'border-[#00D4AA]/30 opacity-70 cursor-not-allowed' 
                        : 'border-white/[0.08] focus:border-[#00D4AA]/50'
                    }`}
                    rows={4}
                  />
                  {isCompleted && (
                    <div className="absolute top-2 right-2">
                      <Sparkles size={20} className="text-[#00D4AA] animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Success Message */}
                {isCompleted && (
                  <div className="mt-3 p-3 rounded-lg flex items-center gap-2 bg-[#00D4AA]/10 text-[#00D4AA] animate-in fade-in duration-300">
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-medium">Perfect! ✨ Moving to next question...</span>
                  </div>
                )}

                {/* Hint */}
                {!isCompleted && showHints[exercise.id] && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg animate-in slide-in-from-top duration-200">
                    <div className="flex items-start gap-2">
                      <Lightbulb size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-300">💡 {exercise.hint}</p>
                    </div>
                  </div>
                )}

                {/* Solution */}
                {!isCompleted && showSolutions[exercise.id] && (
                  <div className="mt-3 p-4 bg-[#1A1A24] border border-white/[0.08] rounded-lg animate-in slide-in-from-top duration-200">
                    <p className="text-xs text-[#6E6E73] mb-2 font-semibold">✨ Sample Solution:</p>
                    <pre className="text-sm text-[#E8E8ED] font-mono whitespace-pre-wrap">
                      {exercise.sampleSolution}
                    </pre>
                  </div>
                )}

                {/* Action Buttons - Only show if not completed */}
                {!isCompleted && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      onClick={() => toggleHint(exercise.id)}
                      size="sm"
                      variant="outline"
                      className="border-white/[0.08] text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05]"
                    >
                      <Lightbulb size={14} className="mr-1" />
                      {showHints[exercise.id] ? 'Hide' : 'Need a'} Hint
                    </Button>
                    <Button
                      onClick={() => toggleSolution(exercise.id)}
                      size="sm"
                      variant="outline"
                      className="border-white/[0.08] text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05]"
                    >
                      <Eye size={14} className="mr-1" />
                      {showSolutions[exercise.id] ? 'Hide' : 'Show'} Solution
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Complete Lesson Button */}
        {allCompleted && onComplete && (
          <div className="mt-8 p-8 bg-gradient-to-r from-[#00D4AA]/10 to-[#7B61FF]/10 border border-[#00D4AA]/30 rounded-lg text-center animate-in zoom-in duration-500">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="font-display text-2xl font-semibold text-[#E8E8ED] mb-2">
              Amazing Work!
            </h3>
            <p className="text-[#A8A8B4] mb-6">
              You've crushed all {exercises.length} exercises! Ready for the next challenge?
            </p>
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-[#00D4AA] to-[#5EEAD4] hover:from-[#5EEAD4] hover:to-[#00D4AA] text-[#0A0A0F] font-semibold px-8 py-3 text-base rounded-full transition-all duration-200 hover:scale-105"
            >
              Next Lesson →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
