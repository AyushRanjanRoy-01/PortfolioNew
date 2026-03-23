import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, CheckCircle, Layout, Book, ExternalLink, Search } from 'lucide-react';
import { promptDocumentation, searchDocumentation } from '../data/promptDocumentation';

const iconMap = {
  BookOpen,
  Zap,
  CheckCircle,
  Layout,
  Book,
  ExternalLink
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const PromptDocumentation = () => {
  const [selectedCategory, setSelectedCategory] = useState('fundamentals');
  const [selectedSection, setSelectedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchDocumentation(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const currentCategory = promptDocumentation[selectedCategory];
  const displaySections = searchQuery ? searchResults : currentCategory?.sections || [];

  return (
    <main className="min-h-screen pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Book className="text-[#00D4AA]" size={40} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight text-[#E8E8ED]">
            Prompt Engineering <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-[#A8A8B4] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive reference guide for prompt engineering techniques, patterns, and best practices.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E73]" size={20} />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-[#12121A] border border-white/[0.08] rounded-lg pl-12 pr-4 py-3 text-[#E8E8ED] placeholder-[#6E6E73] focus:outline-none focus:border-[#00D4AA]/50 transition-colors"
            />
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          {!searchQuery && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="sticky top-24 space-y-2">
                {Object.entries(promptDocumentation).map(([key, category]) => {
                  const Icon = iconMap[category.icon];
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedCategory(key);
                        setSelectedSection(null);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        selectedCategory === key
                          ? 'bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/30'
                          : 'text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05]'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{category.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          )}

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            {searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-12 text-[#9494A0]">
                No results found for "{searchQuery}"
              </div>
            ) : (
              <div className="space-y-8">
                {displaySections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-8 rounded-lg border border-white/[0.08]"
                  >
                    {/* Section Header */}
                    <div className="mb-6">
                      {searchQuery && section.categoryTitle && (
                        <span className="text-xs text-[#6E6E73] mb-2 block">
                          {section.categoryTitle}
                        </span>
                      )}
                      <h2 className="font-display text-2xl font-semibold text-[#E8E8ED] tracking-tight mb-4">
                        {section.title}
                      </h2>
                      <div className="prose prose-invert max-w-none">
                        <div className="text-[#A8A8B4] leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    </div>

                    {/* Examples */}
                    {section.examples && section.examples.length > 0 && (
                      <div className="space-y-4 mt-6">
                        <h3 className="font-display text-lg font-semibold text-[#E8E8ED] tracking-tight">
                          Examples
                        </h3>
                        {section.examples.map((example, exIdx) => (
                          <div key={exIdx} className="bg-[#12121A] rounded-lg p-6 border border-white/[0.08]">
                            <div className="text-sm font-semibold text-[#00D4AA] mb-3">
                              {example.title}
                            </div>
                            <pre className="text-sm text-[#E8E8ED] font-mono whitespace-pre-wrap mb-4 overflow-x-auto">
                              {example.code}
                            </pre>
                            {example.result && (
                              <div className="pt-4 border-t border-white/[0.08]">
                                <div className="text-xs text-[#6E6E73] mb-2">Result:</div>
                                <div className="text-sm text-[#A8A8B4] italic">
                                  {example.result}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default PromptDocumentation;
