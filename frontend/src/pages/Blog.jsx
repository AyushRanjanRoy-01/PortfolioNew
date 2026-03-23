import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowLeft, ArrowRight, MessageSquare, Share2, Copy, Twitter, Linkedin } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Time ago
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return formatDate(dateString);
};

// Blog Index Page
export const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'AI/ML', 'Career', 'Tech'];

  useEffect(() => {
    fetchPosts();
  }, [search, selectedCategory]);

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      
      const response = await axios.get(`${API}/blog?${params}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6" data-testid="blog-index">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-unbounded text-4xl md:text-5xl font-bold text-[#E8E8ED] mb-4">
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-[#9494A0] max-w-2xl mx-auto">
            Thoughts on AI, machine learning, career growth, and everything in between.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F5F6E]" />
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA]"
              data-testid="blog-search-input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                data-testid={`blog-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <div className="skeleton h-6 w-3/4 mb-3" />
                <div className="skeleton h-4 w-full mb-2" />
                <div className="skeleton h-4 w-2/3" />
              </div>
            ))
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-[#9494A0]">
              No posts found. Try a different search term.
            </div>
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="blog-card glass-card p-6 rounded-2xl hover:border-[#00D4AA]/30"
                data-testid={`blog-post-card-${post.slug}`}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="badge-category">{post.category}</span>
                        <div className="flex items-center gap-2 text-[#5F5F6E] text-sm">
                          <Calendar size={14} />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#5F5F6E] text-sm">
                          <Clock size={14} />
                          <span>{post.read_time} min read</span>
                        </div>
                      </div>
                      
                      <h2 className="font-unbounded text-xl text-[#E8E8ED] font-medium mb-2 hover:text-[#00D4AA] transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-[#9494A0] text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-[#00D4AA] text-sm font-medium">
                        Read more
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

// Blog Post Detail Page
export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
    fetchAllPosts();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blog/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!post) return;
    try {
      const response = await axios.get(`${API}/comments/${post?.id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setAllPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (post?.id) {
      fetchComments();
    }
  }, [post?.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post(`${API}/comments`, {
        ...commentForm,
        post_id: post.id
      });
      toast.success('Comment submitted! It will appear after moderation.');
      setCommentForm({ name: '', email: '', content: '' });
    } catch (error) {
      toast.error('Failed to submit comment.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  // Find prev/next posts
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="skeleton h-10 w-3/4 mb-4" />
          <div className="skeleton h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="skeleton h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen pt-24 pb-16 px-6" data-testid="blog-post-detail">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-[#9494A0] hover:text-[#00D4AA] mb-8 transition-colors"
          data-testid="blog-back-button"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="badge-category mb-4 inline-block">{post.category}</span>
          <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-[#E8E8ED] mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-[#9494A0] text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{post.read_time} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare size={14} />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </motion.header>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10"
        >
          <span className="text-[#9494A0] text-sm flex items-center gap-2">
            <Share2 size={14} />
            Share:
          </span>
          <button 
            onClick={shareOnTwitter}
            className="p-2 rounded-full bg-white/5 text-[#9494A0] hover:text-[#00D4AA] hover:bg-white/10 transition-all"
            data-testid="share-twitter"
          >
            <Twitter size={16} />
          </button>
          <button 
            onClick={shareOnLinkedIn}
            className="p-2 rounded-full bg-white/5 text-[#9494A0] hover:text-[#00D4AA] hover:bg-white/10 transition-all"
            data-testid="share-linkedin"
          >
            <Linkedin size={16} />
          </button>
          <button 
            onClick={copyLink}
            className="p-2 rounded-full bg-white/5 text-[#9494A0] hover:text-[#00D4AA] hover:bg-white/10 transition-all"
            data-testid="share-copy"
          >
            <Copy size={16} />
          </button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose-cosmic mb-12"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-white/10">
            {post.tags.map((tag) => (
              <span key={tag} className="tech-pill">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-4 mb-12">
          {prevPost ? (
            <Link 
              to={`/blog/${prevPost.slug}`}
              className="flex-1 glass-card p-4 rounded-xl hover:border-[#00D4AA]/30 transition-all"
              data-testid="prev-post-link"
            >
              <span className="text-[#5F5F6E] text-xs flex items-center gap-1 mb-1">
                <ArrowLeft size={12} />
                Previous
              </span>
              <span className="text-[#E8E8ED] text-sm font-medium line-clamp-1">{prevPost.title}</span>
            </Link>
          ) : <div />}
          
          {nextPost && (
            <Link 
              to={`/blog/${nextPost.slug}`}
              className="flex-1 glass-card p-4 rounded-xl hover:border-[#00D4AA]/30 transition-all text-right"
              data-testid="next-post-link"
            >
              <span className="text-[#5F5F6E] text-xs flex items-center justify-end gap-1 mb-1">
                Next
                <ArrowRight size={12} />
              </span>
              <span className="text-[#E8E8ED] text-sm font-medium line-clamp-1">{nextPost.title}</span>
            </Link>
          )}
        </div>

        {/* Comments Section */}
        <section className="mt-12" data-testid="comments-section">
          <h2 className="font-unbounded text-2xl text-[#E8E8ED] mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="glass-card p-6 rounded-2xl mb-8 space-y-4" data-testid="comment-form">
            <h3 className="text-[#E8E8ED] font-medium">Leave a Comment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                value={commentForm.name}
                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA]"
                data-testid="comment-name-input"
              />
              <Input
                type="email"
                placeholder="Your Email (not displayed)"
                value={commentForm.email}
                onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA]"
                data-testid="comment-email-input"
              />
            </div>
            <Textarea
              placeholder="Your Comment"
              value={commentForm.content}
              onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
              required
              rows={4}
              className="bg-white/5 border-white/10 text-[#E8E8ED] placeholder:text-[#5F5F6E] focus:border-[#00D4AA] resize-none"
              data-testid="comment-content-input"
            />
            <Button 
              type="submit" 
              disabled={submitting}
              className="bg-[#00D4AA] text-[#0A0A0F] font-semibold px-6 py-2 rounded-full hover:bg-[#5EEAD4]"
              data-testid="comment-submit-button"
            >
              {submitting ? 'Submitting...' : 'Post Comment'}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-[#9494A0] text-center py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className="glass-card p-6 rounded-2xl"
                  data-testid={`comment-${comment.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[#E8E8ED] font-medium">{comment.name}</span>
                      <span className="text-[#5F5F6E] text-sm ml-3">{timeAgo(comment.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-[#9494A0]">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </article>
    </main>
  );
};
