#!/bin/bash

# Portfolio Quick Start Script
# This script helps you start both frontend and backend servers

echo "🚀 Starting Ayush's AI/ML Portfolio..."
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the PortfolioNew directory"
    exit 1
fi

# Function to check if port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
    return $?
}

# Kill existing processes on ports
echo "🔍 Checking for existing processes..."
if check_port 5000; then
    echo "⚠️  Port 5000 is in use. Killing existing process..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null
fi

if check_port 3000; then
    echo "⚠️  Port 3000 is in use. Killing existing process..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
fi

echo ""
echo "📦 Installing dependencies..."

# Backend setup
echo "🐍 Setting up backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
echo "✅ Backend dependencies installed"

# Start backend in background
echo "🚀 Starting backend server on port 5000..."
python app.py > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

cd ..

# Frontend setup
echo ""
echo "⚛️  Setting up frontend..."
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies (this may take a few minutes)..."
    yarn install
else
    echo "✅ Frontend dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    echo "REACT_APP_BACKEND_URL=http://localhost:5000" > .env
    echo "✅ .env file created"
fi

echo ""
echo "🎨 Starting frontend server on port 3000..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Your portfolio is starting up!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend:  http://localhost:5000"
echo "📍 Admin:    http://localhost:3000/admin"
echo ""
echo "💡 Press Ctrl+C to stop all servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start frontend (this will block)
yarn start

# Cleanup on exit
trap "echo ''; echo '🛑 Stopping servers...'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM
