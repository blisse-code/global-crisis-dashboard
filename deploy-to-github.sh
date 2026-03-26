#!/bin/bash

# Geopolitical Forecast Dashboard - GitHub Deployment Script
# Usage: ./deploy-to-github.sh YOUR_GITHUB_USERNAME REPO_NAME

set -e

USERNAME=$1
REPO_NAME=${2:-"geopolitical-dashboard"}

if [ -z "$USERNAME" ]; then
    echo "Usage: ./deploy-to-github.sh YOUR_GITHUB_USERNAME [REPO_NAME]"
    echo "Example: ./deploy-to-github.sh johndoe geopolitical-dashboard"
    exit 1
fi

echo "🚀 Preparing to deploy Geopolitical Forecast Dashboard to GitHub..."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📦 Adding files to Git..."
git add -A

# Commit
echo "💾 Committing files..."
git commit -m "Initial commit: Geopolitical Forecast Dashboard

Features:
- Interactive 3D globe with Three.js
- 7 alert types (contamination, flight, travel, tourist, living/death, health, economic)
- 6 global threat indices
- Game theory, astrology, and pattern mapping predictions
- Bandwidth optimization (High/Medium/Low modes)
- 7 pages: Global, Country, City, Predictions, Timeline, Alerts, Settings

Tech Stack: Tailwind CSS v4, Three.js, D3.js, Chart.js, Lucide Icons"

# Add remote
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git" 2>/dev/null || echo "Remote already exists"

# Push
echo "☁️ Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "Repository URL: https://github.com/$USERNAME/$REPO_NAME"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com and sign in with GitHub"
echo "2. Click 'New Project'"
echo "3. Import your repository: $REPO_NAME"
echo "4. Framework Preset: Other"
echo "5. Click 'Deploy'"
echo ""
echo "Your dashboard will be live on Vercel in seconds!"
