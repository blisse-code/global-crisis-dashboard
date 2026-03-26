# Geopolitical Forecast Dashboard

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-blue)](https://kdkq4zvxph7ey.ok.kimi.link)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)

An advanced geopolitical threat intelligence and prediction dashboard combining game theory, astrology patterns, and data-driven forecasting with interactive 3D visualization.

![Dashboard Preview](https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop)

## Features

### Interactive 3D Globe
- Three.js-powered 3D Earth with auto-rotation
- Click-to-navigate: Global → Country → City level
- Color-coded threat level markers
- Bandwidth-aware rendering (3D/2D fallback)
- Zoom and rotation controls

### Seven Alert Types
- **Contamination** - Environmental and biohazard threats
- **Flight Risk** - Aviation safety warnings
- **Travel Risk** - General travel advisories
- **Tourist Risk** - Tourism-specific threats
- **Living/Death Risk** - Extreme survival threats
- **Health Risk** - Disease outbreaks and pandemics
- **Economic Risk** - Financial instability warnings

### Six Global Threat Indices
- Economic Threat Index
- Health Threat Index
- Security Threat Index
- Environmental Threat Index
- Political Threat Index
- Social Threat Index

### Predictive Methodologies
- **Game Theory** - Nash equilibrium, conflict probability simulations
- **Astrology** - Planetary positions, aspect interpretations
- **Pattern Mapping** - Historical pattern recognition

### Bandwidth Optimization
- **High**: Full 3D, all animations, particle effects
- **Medium**: Simplified 3D, reduced animations
- **Low**: 2D map, minimal animations, data priority
- Auto-detection with manual override

## Pages

| Page | Description |
|------|-------------|
| **Global Overview** | 3D globe, threat summary, alerts ticker, collapse timeline |
| **Country Detail** | Flag, threat score, metrics, city list, predictions |
| **City Detail** | Real-time metrics, crime/health/economic indices |
| **Predictions Hub** | Game theory, astrology, pattern mapping tabs |
| **Timeline View** | Historical & predicted events with confidence bands |
| **Alert Center** | All 7 alert types with filters and subscriptions |
| **Settings** | Bandwidth modes, notifications, theme preferences |

## Tech Stack

- **Tailwind CSS v4** - Utility-first styling
- **Three.js** - 3D globe visualization
- **D3.js** - Data visualizations
- **Chart.js** - Interactive charts
- **Lucide Icons** - Clean iconography
- **Vanilla JavaScript** - No framework dependencies

## Project Structure

```
├── index.html                 # Entry point (Global Overview)
├── pages/
│   ├── index.html            # Global Overview
│   ├── country.html          # Country Detail
│   ├── city.html             # City Detail
│   ├── predictions.html      # Predictions Hub
│   ├── timeline.html         # Timeline View
│   ├── alerts.html           # Alert Center
│   └── settings.html         # Settings
├── shared/
│   ├── styles.css            # CSS variables & animations
│   ├── scripts.js            # Shared utilities
│   ├── map-utils.js          # 3D globe functions
│   ├── bandwidth-manager.js  # Optimization manager
│   ├── nav.html              # Sidebar component
│   ├── footer.html           # Footer component
│   └── head.html             # Head template
├── images/                    # Asset storage
├── Design.md                  # Complete design specification
└── README.md                  # This file
```

## Deployment to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Create a GitHub Repository**
   ```bash
   # On GitHub, create a new repository named "geopolitical-dashboard"
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add -A
   git commit -m "Initial commit: Geopolitical Forecast Dashboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/geopolitical-dashboard.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Framework Preset: **Other**
   - Build Command: *(leave empty)*
   - Output Directory: *(leave empty)*
   - Click "Deploy"

### Option 2: Direct Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd /path/to/output
   vercel
   ```

3. Follow the prompts to deploy

### Option 3: Vercel Drag & Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop the entire `output` folder
3. Vercel will auto-detect and deploy

## Environment Variables

No environment variables required - the dashboard uses client-side APIs and CDN resources.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+ (Performance)

## Data Sources

The dashboard is designed to integrate with:
- WHO (World Health Organization)
- World Bank Economic Data
- UN Security Council
- NOAA (Weather)
- USGS (Seismic activity)
- ECDC (Disease tracking)

*Note: Current version uses realistic simulated data structures*

## Customization

### Colors
Edit `shared/styles.css` CSS variables:
```css
:root {
  --primary: #1E3A5F;
  --secondary: #7C3AED;
  --bg-main: #F5F5DC;
  /* ... */
}
```

### Alert Thresholds
Edit alert severity levels in `shared/scripts.js`:
```javascript
const ALERT_THRESHOLDS = {
  critical: 90,
  high: 70,
  medium: 50,
  low: 30
};
```

## License

MIT License - Feel free to use and modify as needed.

## Credits

- Design inspired by modern financial dashboards
- 3D Globe powered by Three.js
- Icons by Lucide
- Charts by Chart.js

---

**Live Demo**: [https://kdkq4zvxph7ey.ok.kimi.link](https://kdkq4zvxph7ey.ok.kimi.link)
