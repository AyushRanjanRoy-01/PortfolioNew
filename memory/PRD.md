# Ayush Ranjan Roy - Gen AI Engineer Portfolio

## Original Problem Statement
Build a full-stack personal portfolio website with a cosmic/deep space theme for Ayush Ranjan Roy (Gen AI Engineer). Features animated starfield background, glassmorphism cards, blog with moderated comments, tech pulse news feed, contact form with email notifications, admin panel.

## Architecture
- **Frontend**: React 19 with Tailwind CSS, Framer Motion, tsparticles
- **Backend**: FastAPI with MongoDB (Motor async driver)
- **Email**: Resend for contact form notifications

## User Personas
1. **Recruiters/Employers**: Looking for portfolio, projects, and contact
2. **Tech Community**: Reading blog posts, tech news
3. **Collaborators**: Reaching out via contact form or WhatsApp

## Core Requirements
- Cosmic dark theme (#0A0A0F background)
- Animated starfield with shooting stars
- Glassmorphism UI components
- Blog with markdown rendering & moderated comments
- Admin panel for content management
- WhatsApp integration (+91 9540968483)

## What's Been Implemented (Jan 2026)
- [x] Animated starfield background with nebula clouds
- [x] Hero section with gradient text
- [x] About section with tech stack pills
- [x] Projects section with filters (All, Data Engineering, AI/ML, Full Stack)
- [x] Blog with search, filters, markdown rendering
- [x] Blog comments (moderated - requires admin approval)
- [x] Tech Pulse news feed
- [x] Contact form (stores in DB, email notification configured)
- [x] Admin dashboard with analytics
- [x] Admin CRUD for Blog, Projects, News, Comments, Messages
- [x] WhatsApp floating button
- [x] Scroll progress indicator
- [x] Responsive design

## Prioritized Backlog
### P0 (Must have - for production)
- [ ] Add Resend API key for email notifications to work

### P1 (Nice to have)
- [ ] Profile image upload/integration
- [ ] RSS feed for blog
- [ ] SEO meta tags & Open Graph
- [ ] Light mode toggle

### P2 (Future enhancements)
- [ ] Newsletter subscription
- [ ] View count analytics per post
- [ ] Related posts suggestions
- [ ] Code copy button in blog posts

## Next Tasks
1. Add Resend API key to enable contact form email notifications
2. Replace placeholder content with actual portfolio data
3. Add real profile photo
4. Configure SEO meta tags
