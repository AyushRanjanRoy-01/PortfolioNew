import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, FolderOpen, Newspaper, MessageSquare, 
  Mail, BarChart2, Plus, Edit2, Trash2, Check, X, Eye, EyeOff
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

// Sidebar Navigation
const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'news', label: 'Tech News', icon: Newspaper },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'messages', label: 'Messages', icon: Mail },
  ];

  return (
    <aside className="admin-sidebar fixed left-0 top-0 h-screen pt-20 hidden lg:block overflow-y-auto" data-testid="admin-sidebar">
      <nav className="py-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`admin-nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
            data-testid={`admin-nav-${item.id}`}
          >
            <item.icon size={18} />
            <span className="font-rajdhani font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Mobile Tab Navigation
const MobileNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard },
    { id: 'blog', icon: FileText },
    { id: 'projects', icon: FolderOpen },
    { id: 'news', icon: Newspaper },
    { id: 'comments', icon: MessageSquare },
    { id: 'messages', icon: Mail },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#12121A] border-t border-white/10 z-40">
      <div className="flex justify-around py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2 rounded-lg ${activeTab === tab.id ? 'text-[#00D4AA] bg-[#00D4AA]/10' : 'text-[#9494A0]'}`}
          >
            <tab.icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

// Dashboard Stats
const DashboardPanel = ({ stats }) => {
  const statCards = [
    { label: 'Total Views', value: stats.total_views, icon: BarChart2, color: '#00D4AA' },
    { label: 'Blog Views', value: stats.blog_views, icon: FileText, color: '#7B61FF' },
    { label: 'Project Views', value: stats.project_views, icon: FolderOpen, color: '#FFB647' },
    { label: 'Pending Comments', value: stats.pending_comments, icon: MessageSquare, color: '#FF6B6B' },
    { label: 'Unread Messages', value: stats.unread_messages, icon: Mail, color: '#00D4AA' },
  ];

  return (
    <div data-testid="admin-dashboard">
      <h2 className="font-unbounded text-2xl text-[#E8E8ED] mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#9494A0] text-sm mb-1">{stat.label}</p>
                <p className="font-unbounded text-3xl text-[#E8E8ED]">{stat.value || 0}</p>
              </div>
              <div 
                className="p-3 rounded-xl" 
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Blog Management
const BlogPanel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '', category: 'AI/ML', 
    tags: '', read_time: 5, published: true
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog?published_only=false`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingPost) {
        await axios.put(`${API}/blog/${editingPost.id}`, data);
        toast.success('Post updated successfully');
      } else {
        await axios.post(`${API}/blog`, data);
        toast.success('Post created successfully');
      }
      fetchPosts();
      resetForm();
    } catch (error) {
      toast.error('Failed to save post');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`${API}/blog/${id}`);
      toast.success('Post deleted');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', slug: '', content: '', excerpt: '', category: 'AI/ML',
      tags: '', read_time: 5, published: true
    });
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (post) => {
    setFormData({
      ...post,
      tags: post.tags?.join(', ') || ''
    });
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  return (
    <div data-testid="admin-blog-panel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-unbounded text-2xl text-[#E8E8ED]">Blog Posts</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-[#00D4AA] text-[#0A0A0F] font-semibold"
              data-testid="add-blog-post-button"
            >
              <Plus size={16} className="mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#12121A] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#E8E8ED] font-unbounded">
                {editingPost ? 'Edit Post' : 'New Post'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
                data-testid="blog-form-title"
              />
              <Input
                placeholder="Slug (URL-friendly)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
                data-testid="blog-form-slug"
              />
              <Textarea
                placeholder="Excerpt (short description)"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={2}
                className="bg-white/5 border-white/10 text-[#E8E8ED] resize-none"
                data-testid="blog-form-excerpt"
              />
              <Textarea
                placeholder="Content (Markdown supported)"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={10}
                className="bg-white/5 border-white/10 text-[#E8E8ED] font-mono text-sm"
                data-testid="blog-form-content"
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-[#E8E8ED]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#12121A] border-white/10">
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Career">Career</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Full Stack">Full Stack</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Read time (min)"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) || 5 })}
                  className="bg-white/5 border-white/10 text-[#E8E8ED]"
                  data-testid="blog-form-readtime"
                />
              </div>
              <Input
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
                data-testid="blog-form-tags"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    data-testid="blog-form-published"
                  />
                  <span className="text-[#9494A0] text-sm">Published</span>
                </div>
                <Button type="submit" className="bg-[#00D4AA] text-[#0A0A0F]" data-testid="blog-form-submit">
                  {editingPost ? 'Update' : 'Create'} Post
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-[#9494A0]">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-[#9494A0]">No posts yet</td></tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} data-testid={`blog-row-${post.id}`}>
                  <td className="font-medium">{post.title}</td>
                  <td><span className="badge-category">{post.category}</span></td>
                  <td>
                    {post.published ? (
                      <span className="text-[#00D4AA] flex items-center gap-1"><Eye size={14} /> Published</span>
                    ) : (
                      <span className="text-[#9494A0] flex items-center gap-1"><EyeOff size={14} /> Draft</span>
                    )}
                  </td>
                  <td className="text-[#9494A0]">{formatDate(post.created_at)}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openEditDialog(post)}
                        className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#00D4AA]"
                        data-testid={`edit-blog-${post.id}`}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#FF3B30]"
                        data-testid={`delete-blog-${post.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Projects Management
const ProjectsPanel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', full_description: '', category: 'AI/ML',
    tech_stack: '', github_url: '', live_url: '', image_url: '', featured: false
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tech_stack: formData.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await axios.put(`${API}/projects/${editingProject.id}`, data);
        toast.success('Project updated successfully');
      } else {
        await axios.post(`${API}/projects`, data);
        toast.success('Project created successfully');
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API}/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', full_description: '', category: 'AI/ML',
      tech_stack: '', github_url: '', live_url: '', image_url: '', featured: false
    });
    setEditingProject(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (project) => {
    setFormData({
      ...project,
      tech_stack: project.tech_stack?.join(', ') || ''
    });
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  return (
    <div data-testid="admin-projects-panel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-unbounded text-2xl text-[#E8E8ED]">Projects</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-[#00D4AA] text-[#0A0A0F] font-semibold"
              data-testid="add-project-button"
            >
              <Plus size={16} className="mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#12121A] border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#E8E8ED] font-unbounded">
                {editingProject ? 'Edit Project' : 'New Project'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
              />
              <Textarea
                placeholder="Short Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={2}
                className="bg-white/5 border-white/10 text-[#E8E8ED] resize-none"
              />
              <Textarea
                placeholder="Full Description"
                value={formData.full_description}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                rows={5}
                className="bg-white/5 border-white/10 text-[#E8E8ED] resize-none"
              />
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-[#E8E8ED]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#12121A] border-white/10">
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="Cloud & DevOps">Cloud & DevOps</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Tech Stack (comma-separated)"
                value={formData.tech_stack}
                onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="GitHub URL"
                  value={formData.github_url || ''}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="bg-white/5 border-white/10 text-[#E8E8ED]"
                />
                <Input
                  placeholder="Live URL"
                  value={formData.live_url || ''}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  className="bg-white/5 border-white/10 text-[#E8E8ED]"
                />
              </div>
              <Input
                placeholder="Image URL"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <span className="text-[#9494A0] text-sm">Featured Project</span>
                </div>
                <Button type="submit" className="bg-[#00D4AA] text-[#0A0A0F]">
                  {editingProject ? 'Update' : 'Create'} Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center py-8 text-[#9494A0]">Loading...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-8 text-[#9494A0]">No projects yet</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td className="font-medium">{project.title}</td>
                  <td><span className="badge-category">{project.category}</span></td>
                  <td>
                    {project.featured ? (
                      <span className="badge-featured">Featured</span>
                    ) : (
                      <span className="text-[#5F5F6E]">-</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openEditDialog(project)}
                        className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#00D4AA]"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#FF3B30]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Tech News Management
const NewsPanel = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    headline: '', source: '', source_url: '', summary: '', category: 'AI'
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API}/tech-news`);
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/tech-news`, formData);
      toast.success('News added successfully');
      fetchNews();
      setFormData({ headline: '', source: '', source_url: '', summary: '', category: 'AI' });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to add news');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news item?')) return;
    try {
      await axios.delete(`${API}/tech-news/${id}`);
      toast.success('News deleted');
      fetchNews();
    } catch (error) {
      toast.error('Failed to delete news');
    }
  };

  return (
    <div data-testid="admin-news-panel">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-unbounded text-2xl text-[#E8E8ED]">Tech News</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00D4AA] text-[#0A0A0F] font-semibold" data-testid="add-news-button">
              <Plus size={16} className="mr-2" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#12121A] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-[#E8E8ED] font-unbounded">Add Tech News</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                placeholder="Headline"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Source Name"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-[#E8E8ED]"
                />
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-[#E8E8ED]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#12121A] border-white/10">
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Cloud">Cloud</SelectItem>
                    <SelectItem value="Data">Data</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Source URL"
                value={formData.source_url}
                onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                required
                className="bg-white/5 border-white/10 text-[#E8E8ED]"
              />
              <Textarea
                placeholder="Summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                required
                rows={3}
                className="bg-white/5 border-white/10 text-[#E8E8ED] resize-none"
              />
              <Button type="submit" className="w-full bg-[#00D4AA] text-[#0A0A0F]">
                Add News
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Headline</th>
              <th>Source</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-8 text-[#9494A0]">Loading...</td></tr>
            ) : news.length === 0 ? (
              <tr><td colSpan="5" className="text-center py-8 text-[#9494A0]">No news yet</td></tr>
            ) : (
              news.map((item) => (
                <tr key={item.id}>
                  <td className="font-medium max-w-xs truncate">{item.headline}</td>
                  <td className="text-[#9494A0]">{item.source}</td>
                  <td><span className="badge-category">{item.category}</span></td>
                  <td className="text-[#9494A0]">{formatDate(item.created_at)}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#FF3B30]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Comments Moderation
const CommentsPanel = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API}/comments?pending_only=false`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${API}/comments/${id}/approve`);
      toast.success('Comment approved');
      fetchComments();
    } catch (error) {
      toast.error('Failed to approve comment');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await axios.delete(`${API}/comments/${id}`);
      toast.success('Comment deleted');
      fetchComments();
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  return (
    <div data-testid="admin-comments-panel">
      <h2 className="font-unbounded text-2xl text-[#E8E8ED] mb-6">Comments</h2>
      
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-[#9494A0]">Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-[#9494A0]">No comments yet</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="glass-card p-6 rounded-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-[#E8E8ED]">{comment.name}</span>
                    <span className="text-[#5F5F6E] text-sm">{comment.email}</span>
                    {!comment.approved && (
                      <span className="px-2 py-0.5 text-xs rounded bg-[#FFB647]/20 text-[#FFB647]">Pending</span>
                    )}
                  </div>
                  <p className="text-[#9494A0] text-sm mb-2">{comment.content}</p>
                  <span className="text-[#5F5F6E] text-xs">{formatDate(comment.created_at)}</span>
                </div>
                <div className="flex gap-2">
                  {!comment.approved && (
                    <button 
                      onClick={() => handleApprove(comment.id)}
                      className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#00D4AA]"
                      data-testid={`approve-comment-${comment.id}`}
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#FF3B30]"
                    data-testid={`delete-comment-${comment.id}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Messages Panel
const MessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/contact`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${API}/contact/${id}/read`);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`${API}/contact/${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div data-testid="admin-messages-panel">
      <h2 className="font-unbounded text-2xl text-[#E8E8ED] mb-6">Contact Messages</h2>
      
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-[#9494A0]">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-[#9494A0]">No messages yet</div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`glass-card p-6 rounded-2xl ${!msg.read ? 'border-[#00D4AA]/30' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-[#E8E8ED]">{msg.name}</span>
                    <span className="text-[#5F5F6E] text-sm">{msg.email}</span>
                    {!msg.read && (
                      <span className="px-2 py-0.5 text-xs rounded bg-[#00D4AA]/20 text-[#00D4AA]">New</span>
                    )}
                  </div>
                  <p className="text-[#00D4AA] text-sm font-medium mb-1">{msg.subject}</p>
                  <p className="text-[#9494A0] text-sm mb-2">{msg.message}</p>
                  <span className="text-[#5F5F6E] text-xs">{formatDate(msg.created_at)}</span>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button 
                      onClick={() => handleMarkRead(msg.id)}
                      className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#00D4AA]"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 rounded-lg bg-white/5 text-[#9494A0] hover:text-[#FF3B30]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main Admin Page
export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/analytics/summary`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPanel stats={stats} />;
      case 'blog': return <BlogPanel />;
      case 'projects': return <ProjectsPanel />;
      case 'news': return <NewsPanel />;
      case 'comments': return <CommentsPanel />;
      case 'messages': return <MessagesPanel />;
      default: return <DashboardPanel stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8" data-testid="admin-page">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="lg:ml-64 px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderPanel()}
        </motion.div>
      </main>
    </div>
  );
}
