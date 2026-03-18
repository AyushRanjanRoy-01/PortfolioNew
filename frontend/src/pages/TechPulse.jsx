import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Newspaper } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI', 'Cloud', 'Data', 'DevOps'];

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  const fetchNews = async () => {
    try {
      const params = selectedCategory !== 'All' ? `?category=${selectedCategory}` : '';
      const response = await axios.get(`${API}/tech-news${params}`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'AI': 'bg-[#7B61FF]/20 text-[#7B61FF] border-[#7B61FF]/30',
      'Cloud': 'bg-[#00D4AA]/20 text-[#00D4AA] border-[#00D4AA]/30',
      'Data': 'bg-[#FFB647]/20 text-[#FFB647] border-[#FFB647]/30',
      'DevOps': 'bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30',
    };
    return colors[category] || 'bg-white/10 text-[#9494A0] border-white/10';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6" data-testid="tech-pulse-page">
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
          <p className="text-[#9494A0] max-w-2xl mx-auto">
            Stay updated with the latest happenings in AI, cloud computing, data engineering, and DevOps.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              data-testid={`tech-pulse-filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="skeleton h-6 w-full mb-3" />
                <div className="skeleton h-4 w-3/4 mb-2" />
                <div className="skeleton h-4 w-full mb-2" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            ))
          ) : news.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#9494A0]">
              No news articles found for this category.
            </div>
          ) : (
            news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col"
                data-testid={`tech-news-card-${item.id}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className={`px-2 py-0.5 text-xs rounded border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9494A0] hover:text-[#00D4AA] transition-colors"
                    data-testid={`news-link-${item.id}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                
                <h2 className="font-unbounded text-lg text-[#E8E8ED] font-medium mb-3 line-clamp-2 flex-grow">
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00D4AA] transition-colors"
                  >
                    {item.headline}
                  </a>
                </h2>
                
                <p className="text-[#9494A0] text-sm mb-4 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between text-[#5F5F6E] text-xs mt-auto pt-4 border-t border-white/5">
                  <span>{item.source}</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
