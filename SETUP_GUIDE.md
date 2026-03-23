# 🚀 Portfolio Setup Guide

## Prerequisites

- **Node.js** v16+ and **npm** or **yarn**
- **Python** 3.8+ (for backend)
- **Git**

---

## 📦 Installation Steps

### 1. **Clone & Navigate**
```bash
cd "/Users/ayushroy/Projects/future of learning/Portfolios/PortfolioNew"
```

### 2. **Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Backend will run on: `http://localhost:5000`

### 3. **Frontend Setup** (New Terminal)
```bash
cd frontend
yarn install
# or: npm install
```

### 4. **Environment Variables**
Create `.env` file in `frontend/` directory:
```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 5. **Start Development Server**
```bash
yarn start
# or: npm start
```
Frontend will run on: `http://localhost:3000`

---

## 🎯 Quick Start Commands

### **Start Everything**
```bash
# Terminal 1 - Backend
cd backend && python app.py

# Terminal 2 - Frontend
cd frontend && yarn start
```

### **Build for Production**
```bash
cd frontend
yarn build
# Creates optimized build in frontend/build/
```

---

## 🔧 Troubleshooting

### **Port Already in Use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### **Module Not Found**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json yarn.lock
yarn install
```

### **Python Dependencies**
```bash
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 📁 Project Structure

```
PortfolioNew/
├── frontend/              # React app
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app
│   └── package.json
├── backend/              # Python Flask API
│   ├── app.py           # Main server
│   └── requirements.txt
└── SETUP_GUIDE.md       # This file
```

---

## 🌐 Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Admin Panel:** http://localhost:3000/admin

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] No console errors
- [ ] Particles animation visible
- [ ] Navigation working
- [ ] Forms submitting (check backend logs)

---

## 🎨 Features Implemented

✅ SEO optimized (meta tags, structured data)
✅ Accessibility (WCAG AA compliant)
✅ Mobile responsive
✅ Performance optimized (50 particles, async loading)
✅ Error boundaries
✅ 404 page
✅ AI/ML focused content
✅ Production-ready

---

## 📝 Next Steps

1. **Add Real Content:** Update projects, blog posts via Admin panel
2. **Deploy:** Consider Vercel (frontend) + Railway (backend)
3. **Analytics:** PostHog already integrated
4. **Custom Domain:** Update meta tags with your domain
5. **Images:** Add profile photo, project screenshots

---

## 🆘 Need Help?

Check console logs:
- **Frontend:** Browser DevTools Console
- **Backend:** Terminal running Python server

Common issues are usually:
- Missing environment variables
- Port conflicts
- Outdated dependencies

---

**Built with ❤️ for AI/ML Engineers**
