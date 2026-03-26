# GitHub + Vercel Deployment Guide

This guide will walk you through deploying the Geopolitical Forecast Dashboard to GitHub and Vercel.

## Quick Start (5 Minutes)

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Repository name: `geopolitical-dashboard`
4. Description: "Geopolitical Forecast Dashboard with 3D visualization"
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (we have one already)
7. Click **Create repository**

### Step 2: Upload Files to GitHub

#### Option A: GitHub Web Upload (Easiest)

1. Download the dashboard files as a ZIP:
   - The files are in `/mnt/okcomputer/output/` 
   - Download all files and folders

2. On your GitHub repository page:
   - Click **"uploading an existing file"** link
   - Drag and drop all files from the output folder
   - Commit message: "Initial commit"
   - Click **Commit changes**

#### Option B: Command Line

```bash
# Navigate to the output folder
cd /path/to/output

# Initialize git
git init
git branch -M main

# Add all files
git add -A

# Commit
git commit -m "Initial commit: Geopolitical Forecast Dashboard"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/geopolitical-dashboard.git

# Push
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your GitHub account
3. Click **"Add New..."** → **"Project"**
4. Find and select your `geopolitical-dashboard` repository
5. Configure:
   - **Framework Preset**: Other
   - **Build Command**: *(leave empty)*
   - **Output Directory**: *(leave empty)*
   - **Install Command**: *(leave empty)*
6. Click **"Deploy"**

7. Wait 30-60 seconds for deployment
8. Your dashboard is now live! 🎉

### Step 4: Custom Domain (Optional)

1. In Vercel dashboard, select your project
2. Go to **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## File Structure to Upload

Make sure these files are in your repository root:

```
geopolitical-dashboard/
├── index.html                 # REQUIRED: Entry point
├── README.md                  # Project documentation
├── .gitignore                 # Git ignore rules
├── pages/                     # REQUIRED: All page files
│   ├── index.html
│   ├── country.html
│   ├── city.html
│   ├── predictions.html
│   ├── timeline.html
│   ├── alerts.html
│   └── settings.html
├── shared/                    # REQUIRED: Shared components
│   ├── styles.css
│   ├── scripts.js
│   ├── map-utils.js
│   ├── bandwidth-manager.js
│   ├── nav.html
│   ├── footer.html
│   └── head.html
└── images/                    # Optional: For future assets
```

## Verification Checklist

After deployment, verify:

- [ ] Homepage loads with 3D globe
- [ ] Navigation works (sidebar links)
- [ ] Country detail page loads
- [ ] City detail page loads
- [ ] Predictions hub works
- [ ] Timeline view displays
- [ ] Alert center shows all 7 alert types
- [ ] Settings page allows bandwidth selection
- [ ] Responsive on mobile devices
- [ ] No console errors

## Troubleshooting

### Issue: 404 errors on page navigation

**Solution**: Add `vercel.json` to repository root:

```json
{
  "routes": [
    { "src": "/", "dest": "/index.html" },
    { "src": "/country", "dest": "/pages/country.html" },
    { "src": "/city", "dest": "/pages/city.html" },
    { "src": "/predictions", "dest": "/pages/predictions.html" },
    { "src": "/timeline", "dest": "/pages/timeline.html" },
    { "src": "/alerts", "dest": "/pages/alerts.html" },
    { "src": "/settings", "dest": "/pages/settings.html" }
  ]
}
```

### Issue: Styles not loading

**Solution**: Check that `shared/styles.css` is properly uploaded and paths are correct.

### Issue: 3D globe not showing

**Solution**: This is normal on low bandwidth. Check Settings → Bandwidth Mode → High.

### Issue: Icons not showing

**Solution**: Lucide icons load from CDN. Check internet connection and ad blockers.

## Updating Your Deployment

To update after making changes:

```bash
# Make your changes
# Then:
git add -A
git commit -m "Update: description of changes"
git push

# Vercel will auto-deploy!
```

## Environment Variables

No environment variables needed! The dashboard uses:
- Client-side rendering
- CDN resources
- LocalStorage for settings

## Performance Tips

1. **Enable compression** in Vercel settings
2. **Use Vercel Edge Network** for global CDN
3. **Enable caching** for static assets
4. Monitor Core Web Vitals in Vercel Analytics

## Support

- **Live Demo**: https://kdkq4zvxph7ey.ok.kimi.link
- **GitHub Issues**: Create an issue in your repository
- **Vercel Docs**: https://vercel.com/docs

---

**Ready to deploy?** Follow Step 1 above and you'll be live in 5 minutes! 🚀
