#!/bin/bash

echo "🚀 Career Compass - Complete Setup"
echo "=================================="

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Setup backend
echo "📦 Setting up backend..."
cd server

# Check if npm is available
if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed"
  exit 1
fi

echo "📦 Installing server dependencies..."
npm install

# Copy .env.example to .env
if [ ! -f ".env" ]; then
  echo "📝 Creating .env from .env.example..."
  cp .env.example .env
  echo "⚠️  Please edit server/.env with your MongoDB URI"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your MongoDB URI"
echo "2. In Terminal 1: cd server && npm run dev"
echo "3. In Terminal 2: npm run dev"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "🔌 Backend: http://localhost:5000"
