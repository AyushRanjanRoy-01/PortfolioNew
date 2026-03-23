import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

// Using NewsAPI.org free tier - Get your API key at https://newsapi.org/
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'demo';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Cache and rate limiting configuration
const CACHE_KEY = 'techpulse_news_cache';
const CACHE_TIMESTAMP_KEY = 'techpulse_cache_timestamp';
const API_CALL_COUNT_KEY = 'techpulse_api_calls';
const API_CALL_TIMESTAMP_KEY = 'techpulse_api_timestamp';
const MAX_API_CALLS_PER_HOUR = 5;
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const ONE_HOUR_MS = 60 * 60 * 1000;
const ITEMS_PER_PAGE = 10;
const MAX_NEWS_ITEMS = 50;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function TechPulse() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if cache is valid
  const isCacheValid = () => {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!timestamp) return false;
    const age = Date.now() - parseInt(timestamp);
    return age < CACHE_DURATION_MS;
  };

  // Check if we can make API call (rate limiting)
  const canMakeAPICall = () => {
    const callCount = parseInt(localStorage.getItem(API_CALL_COUNT_KEY) || '0');
    const callTimestamp = parseInt(localStorage.getItem(API_CALL_TIMESTAMP_KEY) || '0');
    const timeSinceLastReset = Date.now() - callTimestamp;

    // Reset counter if more than 1 hour has passed
    if (timeSinceLastReset > ONE_HOUR_MS) {
      localStorage.setItem(API_CALL_COUNT_KEY, '0');
      localStorage.setItem(API_CALL_TIMESTAMP_KEY, Date.now().toString());
      return true;
    }

    return callCount < MAX_API_CALLS_PER_HOUR;
  };

  // Increment API call counter
  const incrementAPICallCount = () => {
    const callCount = parseInt(localStorage.getItem(API_CALL_COUNT_KEY) || '0');
    localStorage.setItem(API_CALL_COUNT_KEY, (callCount + 1).toString());
    if (callCount === 0) {
      localStorage.setItem(API_CALL_TIMESTAMP_KEY, Date.now().toString());
    }
  };

  // Load news from cache or API
  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from cache first
      if (isCacheValid()) {
        const cachedNews = localStorage.getItem(CACHE_KEY);
        if (cachedNews) {
          const parsedNews = JSON.parse(cachedNews);
          setNews(parsedNews);
          setTotalPages(Math.ceil(parsedNews.length / ITEMS_PER_PAGE));
          setLoading(false);
          return;
        }
      }

      // Check rate limiting before making API call
      if (!canMakeAPICall()) {
        const callCount = parseInt(localStorage.getItem(API_CALL_COUNT_KEY) || '0');
        setError(`Rate limit reached (${callCount}/${MAX_API_CALLS_PER_HOUR} calls this hour). Using cached data or try again later.`);
        const cachedNews = localStorage.getItem(CACHE_KEY);
        if (cachedNews) {
          const parsedNews = JSON.parse(cachedNews);
          setNews(parsedNews);
          setTotalPages(Math.ceil(parsedNews.length / ITEMS_PER_PAGE));
        } else {
          setNews(getDemoNews());
          setTotalPages(1);
        }
        setLoading(false);
        return;
      }

      // Fetch fresh data from API
      await fetchNews();
    } catch (err) {
      console.error('Error loading news:', err);
      setError('Failed to load news. Using demo data.');
      setNews(getDemoNews());
      setTotalPages(1);
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    try {
      // AI and future technology keywords
      const keywords = 'artificial intelligence OR machine learning OR deep learning OR neural networks OR GPT OR LLM OR generative AI OR quantum computing OR robotics OR autonomous vehicles OR future technology';
      
      // Fetch from NewsAPI.org - using 'everything' endpoint for better filtering
      const response = await axios.get(NEWS_API_URL, {
        params: {
          q: keywords,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: MAX_NEWS_ITEMS,
          apiKey: NEWS_API_KEY
        }
      });
      
      if (response.data.status === 'ok') {
        incrementAPICallCount();
        
        // Transform and filter NewsAPI response
        const transformedNews = response.data.articles
          .filter(article => article.title && article.description && article.url)
          .slice(0, MAX_NEWS_ITEMS)
          .map((article, index) => ({
            id: index,
            headline: article.title,
            summary: article.description || article.content?.substring(0, 150) + '...' || 'No description available',
            source: article.source.name,
            url: article.url,
            date: article.publishedAt,
            image: article.urlToImage,
            category: 'AI & Future Tech'
          }));
        
        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify(transformedNews));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        
        setNews(transformedNews);
        setTotalPages(Math.ceil(transformedNews.length / ITEMS_PER_PAGE));
      } else {
        setError('Failed to fetch news. Please check your API key.');
        setNews(getDemoNews());
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError(error.response?.data?.message || 'Failed to fetch news. Using cached or demo data.');
      
      // Try to use cached data
      const cachedNews = localStorage.getItem(CACHE_KEY);
      if (cachedNews) {
        const parsedNews = JSON.parse(cachedNews);
        setNews(parsedNews);
        setTotalPages(Math.ceil(parsedNews.length / ITEMS_PER_PAGE));
      } else {
        setNews(getDemoNews());
        setTotalPages(1);
      }
    } finally {
      setLoading(false);
    }
  };

  // Demo news data for when API is unavailable
  const getDemoNews = () => [
    {
      id: 1,
      headline: 'Breakthrough in Artificial General Intelligence Research',
      summary: 'Researchers announce significant progress toward AGI with new neural architecture that demonstrates reasoning capabilities.',
      source: 'AI Research Today',
      url: '#',
      date: new Date().toISOString(),
      category: 'AI & Future Tech'
    },
    {
      id: 2,
      headline: 'Quantum Computing Achieves New Milestone',
      summary: 'Scientists successfully demonstrate quantum advantage in real-world optimization problems.',
      source: 'Quantum Weekly',
      url: '#',
      date: new Date().toISOString(),
      category: 'AI & Future Tech'
    },
    {
      id: 3,
      headline: 'Next-Gen Robotics with Advanced AI Integration',
      summary: 'New humanoid robots showcase unprecedented dexterity and decision-making powered by large language models.',
      source: 'Future Tech',
      url: '#',
      date: new Date().toISOString(),
      category: 'AI & Future Tech'
    },
    {
      id: 4,
      headline: 'Autonomous Vehicles Reach Level 5 Capability',
      summary: 'Major automotive companies announce fully autonomous driving systems ready for mass deployment.',
      source: 'Auto AI News',
      url: '#',
      date: new Date().toISOString(),
      category: 'AI & Future Tech'
    },
    {
      id: 5,
      headline: 'Generative AI Transforms Scientific Discovery',
      summary: 'AI models accelerate drug discovery and materials science research by predicting molecular structures.',
      source: 'Science & AI',
      url: '#',
      date: new Date().toISOString(),
      category: 'AI & Future Tech'
    }
  ];

  // Pagination helpers
  const getPaginatedNews = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return news.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRefresh = () => {
    if (canMakeAPICall()) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(CACHE_TIMESTAMP_KEY);
      loadNews();
    } else {
      const callCount = parseInt(localStorage.getItem(API_CALL_COUNT_KEY) || '0');
      setError(`Rate limit reached (${callCount}/${MAX_API_CALLS_PER_HOUR} calls this hour). Please try again later.`);
    }
  };

  // Get cache info for display
  const getCacheInfo = () => {
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const callCount = parseInt(localStorage.getItem(API_CALL_COUNT_KEY) || '0');
    if (!timestamp) return null;
    const age = Date.now() - parseInt(timestamp);
    const hoursOld = Math.floor(age / (60 * 60 * 1000));
    return { hoursOld, callCount };
  };

  const cacheInfo = getCacheInfo();
  const paginatedNews = getPaginatedNews();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6" data-testid="tech-pulse-page">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[#00D4AA]" />
            <h1 className="font-unbounded text-4xl md:text-5xl font-bold text-[#E8E8ED]">
              Tech <span className="gradient-text">Pulse</span>
            </h1>
          </div>
          <p className="text-[#9494A0] max-w-2xl mx-auto mb-4">
            Stay updated with the latest breakthroughs in AI, machine learning, and future technology.
          </p>
          {cacheInfo && (
            <p className="text-[#6E6E73] text-xs">
              Last updated: {cacheInfo.hoursOld}h ago • API calls: {cacheInfo.callCount}/{MAX_API_CALLS_PER_HOUR} this hour
            </p>
          )}
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass-card rounded-lg border border-white/[0.08]"
        >
          <div className="text-sm text-[#A8A8B4]">
            <span className="text-[#00D4AA] font-semibold">{news.length}</span> AI & Future Tech articles • 
            Refreshes daily • Max {MAX_API_CALLS_PER_HOUR} API calls/hour
          </div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 rounded-full text-sm font-medium bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA]/20 transition-all"
          >
            Refresh News
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-300 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* News Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            [...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-lg">
                <div className="skeleton h-6 w-full mb-3" />
                <div className="skeleton h-4 w-3/4 mb-2" />
                <div className="skeleton h-4 w-full mb-2" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            ))
          ) : paginatedNews.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#9494A0]">
              No AI or future technology news articles found.
            </div>
          ) : (
            paginatedNews.map((article, index) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group glass-card p-6 rounded-lg border border-white/10 hover:border-[#00D4AA]/30 transition-all duration-200 flex flex-col"
                data-testid={`tech-news-card-${article.id}`}
              >
                {/* Article Image */}
                {article.image && (
                  <div className="mb-4 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.headline}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="px-2 py-0.5 text-xs rounded border bg-[#7B61FF]/20 text-[#7B61FF] border-[#7B61FF]/30">
                    AI & Future Tech
                  </span>
                  <ExternalLink size={16} className="text-[#6E6E73] group-hover:text-[#00D4AA] transition-colors" />
                </div>
                
                <h2 className="font-display text-lg text-[#E8E8ED] font-semibold mb-3 line-clamp-2 flex-grow tracking-tight group-hover:text-[#00D4AA] transition-colors">
                  {article.headline}
                </h2>
                
                <p className="text-[#9494A0] text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-[#6E6E73] text-xs mt-auto pt-4 border-t border-white/[0.08]">
                  <span>{article.source}</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{formatDate(article.date)}</span>
                  </div>
                </div>
              </motion.a>
            ))
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-white/[0.08] text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first, last, current, and adjacent pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[40px] h-10 rounded-lg font-medium text-sm transition-all ${
                        currentPage === page
                          ? 'bg-[#00D4AA] text-[#0A0A0F]'
                          : 'border border-white/[0.08] text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05]'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-[#6E6E73]">...</span>;
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-white/[0.08] text-[#A8A8B4] hover:text-[#E8E8ED] hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
