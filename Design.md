# Design PRD: Geopolitical Forecast Dashboard

## 1. Overview

### Project Summary
- **Project Name**: Global Threat Intelligence & Prediction Dashboard (GeoForecast)
- **Type**: Interactive Dashboard with 3D Map Visualization
- **Target Audience**: Intelligence analysts, policymakers, researchers, emergency responders, and informed general public
- **Language**: English (primary), with i18n support structure
- **Platform**: Web-based, responsive design
- **Primary Purpose**: Provide real-time and predictive geopolitical threat analysis using game theory, astrology patterns, and data-driven forecasting

### Key Value Propositions
1. Multi-dimensional threat assessment (economic, health, security, environment, political, social)
2. Predictive analytics using game theory simulations
3. Astrological pattern correlation for historical trend analysis
4. Real-time alert system with severity classification
5. Actionable recommendations for individuals and authorities
6. Bandwidth-optimized experience for all connection types

---

## 2. Page Manifest

| Page ID | Page Name | File Name | Is Entry | SubAgent Notes |
|---------|-----------|-----------|----------|----------------|
| index | Global Overview | index.html | Yes | Main dashboard with 3D globe, global threat summary, critical alerts ticker, world collapse prediction timeline. Hero section with interactive globe takes 50vh. |
| country | Country Detail | country.html | No | Country-level analysis with flag, threat score, key metrics grid (crime, health, economic, weather), city list with threat levels, game theory & astrology panels, authority recommendations. |
| city | City Detail | city.html | No | City-level granular data with coordinates, real-time metrics dashboard, crime/health/economic indices, civil affairs status, individual & authority action recommendations. |
| predictions | Predictions Hub | predictions.html | No | Game theory simulations, astrological forecasts, pattern recognition visualizations, confidence indicators, historical accuracy statistics. Tab-based interface. |
| timeline | Timeline View | timeline.html | No | Historical and predicted events timeline with navigation controls, event categories filter, vertical timeline display, prediction confidence bands. |
| alerts | Alert Center | alerts.html | No | Centralized alert management with 7 alert type filters, severity/ geographic filters, alert cards grid, subscription management. |
| settings | Settings | settings.html | No | Bandwidth mode selector (High/Medium/Low), 3D/2D toggle, animation preferences, notification settings, data refresh rates, theme preferences. |

---

## 3. Global Design System

### 3.1 Colors

#### Primary Palette
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Primary | #1E3A5F | rgb(30, 58, 95) | Headers, primary buttons, navigation active state |
| Primary Light | #2D4A6F | rgb(45, 74, 111) | Hover states, secondary elements |
| Primary Dark | #152A45 | rgb(21, 42, 69) | Active states, pressed buttons |

#### Secondary Palette
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Secondary | #7C3AED | rgb(124, 58, 237) | Accent elements, 3D globe highlights, charts |
| Secondary Light | #9F67F2 | rgb(159, 103, 242) | Hover accents, glow effects |
| Secondary Dark | #5B21B6 | rgb(91, 33, 182) | Deep accent, shadows |

#### Background Colors
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Background Main | #F5F5DC | rgb(245, 245, 220) | Main page background (cream/beige) |
| Background Alt | #F0F4F8 | rgb(240, 244, 248) | Alternate sections, cards container |
| Background Dark | #1A1A2E | rgb(26, 26, 46) | Dark mode background, footer |
| Card Background | #FFFFFF | rgb(255, 255, 255) | Card surfaces |
| Card Background Alt | #FAFAFA | rgb(250, 250, 250) | Alternate card surfaces |

#### Text Colors
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Text Primary | #1A1A1A | rgb(26, 26, 26) | Main headings, body text |
| Text Secondary | #4A5568 | rgb(74, 85, 104) | Subheadings, descriptions |
| Text Muted | #718096 | rgb(113, 128, 150) | Captions, metadata |
| Text Light | #FFFFFF | rgb(255, 255, 255) | Text on dark backgrounds |
| Text Gold | #B8860B | rgb(184, 134, 11) | Special highlights, astrology elements |

#### Alert Colors (Severity Levels)
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Alert Critical | #DC2626 | rgb(220, 38, 38) | Critical alerts, world collapse indicators |
| Alert High | #F97316 | rgb(249, 115, 22) | High severity threats |
| Alert Medium | #EAB308 | rgb(234, 179, 8) | Medium severity warnings |
| Alert Low | #22C55E | rgb(34, 197, 94) | Low risk, safe conditions |
| Alert Info | #3B82F6 | rgb(59, 130, 246) | Informational alerts |

#### Accent Colors
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Accent Gold | #FFD700 | rgb(255, 215, 0) | Premium features, astrology highlights |
| Accent Coral | #E85D4E | rgb(232, 93, 78) | Financial indicators, negative trends |
| Accent Teal | #14B8A6 | rgb(20, 184, 166) | Positive indicators, health metrics |
| Accent Purple | #7C3AED | rgb(124, 58, 237) | 3D elements, predictions |

#### Map/Visualization Colors
| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| Map Ocean | #1E3A5F | rgb(30, 58, 95) | 3D globe ocean |
| Map Land | #2D5016 | rgb(45, 80, 22) | 3D globe land masses |
| Map Glow | #7C3AED | rgb(124, 58, 237) | Location markers glow |
| Heatmap Low | #22C55E | rgb(34, 197, 94) | Heatmap safe zones |
| Heatmap Medium | #EAB308 | rgb(234, 179, 8) | Heatmap warning zones |
| Heatmap High | #F97316 | rgb(249, 115, 22) | Heatmap danger zones |
| Heatmap Critical | #DC2626 | rgb(220, 38, 38) | Heatmap critical zones |

### 3.2 Typography

#### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
--font-display: 'Inter', sans-serif;
```

#### Type Scale
| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---------|----------------|---------------|--------|-------------|----------------|
| H1 | 48px / 3rem | 32px / 2rem | 700 | 1.1 | -0.02em |
| H2 | 36px / 2.25rem | 28px / 1.75rem | 600 | 1.2 | -0.01em |
| H3 | 28px / 1.75rem | 22px / 1.375rem | 600 | 1.3 | 0 |
| H4 | 22px / 1.375rem | 18px / 1.125rem | 600 | 1.4 | 0 |
| H5 | 18px / 1.125rem | 16px / 1rem | 500 | 1.4 | 0.01em |
| H6 | 16px / 1rem | 14px / 0.875rem | 500 | 1.5 | 0.01em |
| Body Large | 18px / 1.125rem | 16px / 1rem | 400 | 1.6 | 0 |
| Body | 16px / 1rem | 14px / 0.875rem | 400 | 1.6 | 0 |
| Body Small | 14px / 0.875rem | 12px / 0.75rem | 400 | 1.5 | 0 |
| Caption | 12px / 0.75rem | 11px / 0.6875rem | 400 | 1.4 | 0.02em |
| Overline | 11px / 0.6875rem | 10px / 0.625rem | 600 | 1.2 | 0.08em |

### 3.3 Spacing

#### Base Unit
- Base spacing unit: 4px
- All spacing values are multiples of 4px

#### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px / 0.25rem | Tight spacing, icon gaps |
| space-2 | 8px / 0.5rem | Small gaps, inline spacing |
| space-3 | 12px / 0.75rem | Compact padding |
| space-4 | 16px / 1rem | Standard padding, card gaps |
| space-5 | 20px / 1.25rem | Medium spacing |
| space-6 | 24px / 1.5rem | Section padding |
| space-8 | 32px / 2rem | Large gaps, section margins |
| space-10 | 40px / 2.5rem | XL spacing |
| space-12 | 48px / 3rem | Section separators |
| space-16 | 64px / 4rem | Major section breaks |
| space-20 | 80px / 5rem | Hero spacing |
| space-24 | 96px / 6rem | Page-level spacing |

#### Layout Spacing
| Context | Value |
|---------|-------|
| Page padding (desktop) | 32px (space-8) |
| Page padding (tablet) | 24px (space-6) |
| Page padding (mobile) | 16px (space-4) |
| Max container width | 1440px |
| Sidebar width | 280px |
| Header height | 72px |
| Card padding | 24px (space-6) |
| Card gap | 24px (space-6) |
| Section gap | 48px (space-12) |

### 3.4 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 4px | Small elements, tags |
| radius-md | 8px | Buttons, inputs |
| radius-lg | 12px | Small cards |
| radius-xl | 16px | Cards, modals |
| radius-2xl | 20px | Large cards, panels |
| radius-3xl | 24px | Hero elements |
| radius-full | 9999px | Pills, avatars, circular elements |

### 3.5 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05) | Subtle elevation |
| shadow-md | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06) | Cards |
| shadow-lg | 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05) | Elevated cards |
| shadow-xl | 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04) | Modals, dropdowns |
| shadow-2xl | 0 25px 50px -12px rgba(0,0,0,0.25) | Overlays, hero elements |
| shadow-glow | 0 0 20px rgba(124,58,237,0.3) | 3D globe glow, accent elements |

### 3.6 Animation Defaults

#### Duration Values
| Token | Value | Usage |
|-------|-------|-------|
| duration-fast | 150ms | Micro-interactions, hovers |
| duration-normal | 300ms | Standard transitions |
| duration-slow | 500ms | Complex animations |
| duration-slower | 700ms | Page transitions |

#### Easing Functions
| Token | Value | Usage |
|-------|-------|-------|
| ease-default | cubic-bezier(0.4, 0, 0.2, 1) | Standard transitions |
| ease-in | cubic-bezier(0.4, 0, 1, 1) | Entering animations |
| ease-out | cubic-bezier(0, 0, 0.2, 1) | Exiting animations |
| ease-bounce | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Playful animations |
| ease-spring | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Elastic effects |

#### Stagger Delays
| Context | Delay |
|---------|-------|
| Card grid | 50ms between items |
| List items | 30ms between items |
| Alert sequence | 100ms between alerts |
| Globe markers | 80ms between markers |

### 3.7 Shared Components

#### 3.7.1 Header Component
```
Height: 72px
Background: #FFFFFF
Border-bottom: 1px solid #E2E8F0
Position: fixed, z-index: 100
Padding: 0 32px

Left: Logo (40px height) + App name
Center: Global threat level indicator (pill shape)
Right: Alert bell icon, Settings gear, User avatar
```

#### 3.7.2 Sidebar Component
```
Width: 280px (desktop), 100% (mobile overlay)
Background: #FFFFFF
Border-right: 1px solid #E2E8F0
Position: fixed left
Padding: 24px 16px

Menu Items:
- Icon (24px) + Label
- Active: Background #F0F4F8, Left border 3px #7C3AED
- Hover: Background #F8FAFC
- Gap between items: 8px
```

#### 3.7.3 Alert Card Component
```
Background: #FFFFFF
Border-radius: 16px
Padding: 20px
Border-left: 4px solid [alert color]
Shadow: shadow-md

Structure:
- Alert icon (24px, colored)
- Alert type badge (pill)
- Title (H5)
- Description (Body Small)
- Timestamp (Caption)
- Location tag
- Severity indicator (colored dot)
```

#### 3.7.4 Metric Card Component
```
Background: #FFFFFF
Border-radius: 16px
Padding: 24px
Shadow: shadow-md
Min-height: 140px

Structure:
- Icon (32px, in circular background)
- Label (Caption, uppercase)
- Value (H2, bold)
- Change indicator (up/down arrow + percentage)
- Mini chart (optional, 40px height)
```

#### 3.7.5 3D Globe Container
```
Height: 50vh (min 400px)
Width: 100%
Background: radial-gradient(circle at center, #1E3A5F 0%, #0F172A 100%)
Border-radius: 24px
Overflow: hidden
Position: relative

Overlay Controls:
- Zoom buttons (bottom-right)
- Rotate toggle (bottom-right)
- Reset view (bottom-right)
- Location search (top-left)
```

#### 3.7.6 Footer Component
```
Background: #1A1A2E
Padding: 48px 32px
Color: #FFFFFF

Structure:
- Logo + Tagline
- Quick links (3 columns)
- Social icons
- Copyright + Legal links
```

#### 3.7.7 Button Components

**Primary Button**
```
Background: #1E3A5F
Color: #FFFFFF
Padding: 12px 24px
Border-radius: 8px
Font-weight: 500
Hover: Background #2D4A6F, transform translateY(-1px)
Active: Background #152A45, transform translateY(0)
Transition: all 150ms ease-default
```

**Secondary Button**
```
Background: transparent
Color: #1E3A5F
Border: 1px solid #1E3A5F
Padding: 12px 24px
Border-radius: 8px
Font-weight: 500
Hover: Background #F0F4F8
```

**Alert Button (Critical)**
```
Background: #DC2626
Color: #FFFFFF
Padding: 12px 24px
Border-radius: 8px
Hover: Background #B91C1C
Animation: pulse 2s infinite (optional)
```

#### 3.7.8 Progress Indicator Component
```
Circular Progress:
- Size: 80px (default), 120px (large), 48px (small)
- Stroke width: 8px
- Background track: #E2E8F0
- Progress color: Dynamic based on value
- Animation: stroke-dashoffset 500ms ease-out

Linear Progress:
- Height: 8px
- Border-radius: 4px
- Background: #E2E8F0
- Fill: Dynamic color
```

### 3.8 Bandwidth Optimization Modes

#### High Bandwidth Mode (Default)
- Full 3D globe with Three.js
- Real-time particle effects
- Smooth 60fps animations
- High-resolution textures (4K)
- Animated transitions everywhere
- Live data streaming
- WebGL effects enabled

#### Medium Bandwidth Mode
- Simplified 3D globe (reduced polygons)
- Static particle effects
- 30fps animations
- Medium resolution textures (2K)
- Reduced transition complexity
- Polling-based data updates (5s)
- Basic WebGL

#### Low Bandwidth Mode
- 2D map with D3.js (no WebGL)
- No particle effects
- Minimal animations (CSS only)
- Low resolution textures (1K)
- Instant transitions
- Manual data refresh only
- Static images where possible

---

## 4. Page Specifications

### 4.1 Page: index (Global Overview - ENTRY POINT)

#### Purpose
Main dashboard providing at-a-glance global threat overview with interactive 3D globe visualization, real-time alert summary, and quick access to all major dashboard functions.

#### Sections

**Section 1: Hero with 3D Globe Visualization**
- Height: 50vh (minimum 400px)
- Full-width container
- 3D interactive globe centered
- Floating location markers with threat indicators
- Overlay controls (zoom, rotate, reset)
- Quick country search (top-left overlay)
- Global stats overlay (top-right): Total alerts, Active threats, Countries monitored

**Section 2: Global Threat Summary Cards**
- 6-card grid (3x2 desktop, 2x3 tablet, 1x6 mobile)
- Cards: Economic, Health, Security, Environment, Political, Social
- Each card shows: Icon, Label, Global Score (0-100), Trend arrow, Mini sparkline
- Score color coding: 0-25 (green), 26-50 (yellow), 51-75 (orange), 76-100 (red)

**Section 3: Critical Alerts Ticker**
- Horizontal scrolling ticker
- Background: Alert Critical color with gradient
- Shows: Alert icon + Location + Brief message + Timestamp
- Pause on hover
- Click to open alert details

**Section 4: World Collapse Prediction Timeline**
- Horizontal timeline visualization
- Current date marker
- Prediction milestones with confidence intervals
- Color-coded threat escalation
- Interactive: Hover for details, click for full timeline

**Section 5: Regional Threat Heatmap**
- 2D world map (simplified for performance)
- Color-coded regions by threat level
- Hover: Region name + aggregate threat score
- Click: Navigate to region/country view

**Section 6: Quick Action Suggestions**
- 3-column layout (desktop)
- Cards: Individual Actions, Authority Actions, Emergency Protocols
- Each card: 3-5 actionable items with priority indicators

#### Layout Structure
```
[Header - Fixed 72px]
[Sidebar - Fixed 280px]
[Main Content - Margin-left 280px]
  ├─ Hero Section (50vh)
  │   ├─ 3D Globe (centered)
  │   ├─ Search Overlay (top-left)
  │   └─ Stats Overlay (top-right)
  ├─ Threat Summary Cards (grid)
  ├─ Alerts Ticker (full-width)
  ├─ Collapse Timeline (full-width)
  ├─ Regional Heatmap (full-width)
  └─ Quick Actions (3-column)
[Footer]
```

#### Visual Elements
- **Images**: None (3D globe is programmatic)
- **Icons**: Lucide icons for all categories
  - Economic: TrendingUp
  - Health: Heart
  - Security: Shield
  - Environment: Leaf
  - Political: Landmark
  - Social: Users
- **Charts**: Sparklines for each threat card
- **Globe**: Three.js with custom shaders for atmosphere glow

#### Animations
| Element | Animation | Trigger | Duration | Easing |
|---------|-----------|---------|----------|--------|
| Globe | Continuous rotation | Load | Infinite | Linear |
| Globe markers | Pulse glow | Load | 2s | Ease-in-out |
| Cards | Fade up + scale | Scroll into view | 500ms | Ease-out |
| Cards | Stagger delay | Scroll into view | 50ms each | - |
| Alert ticker | Horizontal scroll | Load | 20s | Linear |
| Alert critical | Pulse border | Continuous | 2s | Ease-in-out |
| Threat scores | Count up | Scroll into view | 1000ms | Ease-out |
| Timeline | Slide in from left | Scroll into view | 700ms | Ease-out |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| Globe marker | Click | Navigate to country page |
| Globe | Drag | Rotate view |
| Globe | Scroll | Zoom in/out |
| Threat card | Click | Expand detailed view |
| Alert ticker item | Click | Open alert modal |
| Heatmap region | Click | Navigate to country page |
| Quick action | Click | Execute or show details |
| Search | Type | Filter countries dropdown |

#### Responsive Behavior
- Desktop: Full layout as specified
- Tablet (< 1024px): Sidebar collapses to hamburger, 2-column grids
- Mobile (< 768px): Single column, globe becomes 2D map, sidebar overlay

---

### 4.2 Page: country (Country Detail)

#### Purpose
Detailed country-level threat analysis with comprehensive metrics, city breakdowns, and predictive insights.

#### Sections

**Section 1: Country Header**
- Full-width banner with flag background (subtle, 10% opacity)
- Flag icon (64px)
- Country name (H1)
- ISO code badge
- Overall threat score (circular progress, 120px)
- Last updated timestamp
- Quick actions: Share, Export, Subscribe

**Section 2: Key Metrics Grid**
- 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Metrics:
  1. Crime Index (0-100, trend)
  2. Health Index (0-100, trend)
  3. Economic Index (0-100, trend)
  4. Weather Conditions (current + forecast)
- Each metric: Icon, Label, Value, Mini chart, Change indicator

**Section 3: City List with Threat Levels**
- Sortable table or card list
- Columns: City name, Population, Threat level, Crime, Health, Economic
- Color-coded threat badges
- Search/filter functionality
- Pagination (20 items per page)
- Click row to navigate to city detail

**Section 4: Game Theory Prediction Panel**
- Tabbed interface: Current | 30 Days | 90 Days | 1 Year
- Simulation visualization
- Key scenarios with probability percentages
- Confidence intervals
- Run new simulation button

**Section 5: Astrology Forecast Panel**
- Current planetary positions
- Astrological forecast for country
- Historical correlation chart
- Confidence score
- Next significant dates

**Section 6: Pattern Mapping Visualization**
- Interactive pattern chart
- Historical event markers
- Pattern recognition highlights
- Similar historical periods
- Predicted pattern continuation

**Section 7: Authority Action Recommendations**
- 3 tabs: Country | State | District/City
- Each tab: Prioritized action list
- Actions: Title, Description, Priority, Timeline
- Mark as implemented checkbox

#### Layout Structure
```
[Header]
[Sidebar]
[Main Content]
  ├─ Country Header (full-width, ~200px)
  ├─ Key Metrics (4-column grid)
  ├─ Two-column layout
  │   ├─ Left (60%): City List
  │   └─ Right (40%): Game Theory Panel
  ├─ Two-column layout
  │   ├─ Left (50%): Astrology Panel
  │   └─ Right (50%): Pattern Mapping
  └─ Authority Actions (full-width, tabbed)
[Footer]
```

#### Visual Elements
- **Images**: Country flag (SVG or high-quality PNG)
- **Icons**: Lucide icons for all metrics
- **Charts**: 
  - Line charts for trends
  - Bar charts for comparisons
  - Radar chart for overall threat profile
- **Globe**: Mini 3D globe with country highlighted

#### Animations
| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Threat score | Circular progress fill | Load | 1000ms |
| Metric values | Count up | Scroll into view | 800ms |
| City list rows | Fade in stagger | Load | 30ms each |
| Charts | Draw animation | Scroll into view | 700ms |
| Tab content | Fade transition | Tab click | 300ms |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| City row | Click | Navigate to city page |
| Metric card | Click | Expand detailed chart |
| Prediction tab | Click | Switch timeframe |
| Run simulation | Click | Show loading, then results |
| Action item | Click | Expand details |
| Subscribe | Click | Toggle subscription |

---

### 4.3 Page: city (City Detail)

#### Purpose
Granular city-level threat data with real-time metrics and actionable recommendations.

#### Sections

**Section 1: City Header**
- City name (H1) with country breadcrumb
- Coordinates display
- Current weather widget
- Local time
- Overall threat score (circular)
- Quick actions: Back to country, Share, Alert settings

**Section 2: Real-Time Metrics Dashboard**
- 6-metric grid
- Auto-refresh indicator (last update)
- Metrics refresh every 30 seconds (configurable)
- Visual indicators for changes (up/down arrows with colors)

**Section 3: Crime Index with Trends**
- Current crime index (0-100)
- Historical trend chart (30/90/365 days)
- Crime type breakdown (pie chart)
- Hotspot map (if available)
- Comparison to national average

**Section 4: Health Index with Disease Alerts**
- Current health index
- Active disease alerts
- Healthcare capacity indicator
- Vaccination rates
- Air quality index
- Water quality status

**Section 5: Economic Indicators**
- Employment rate
- Cost of living index
- Business sentiment
- Real estate trends
- Inflation rate
- Currency stability

**Section 6: Civil Affairs Status**
- Government stability score
- Public sentiment gauge
- Infrastructure status
- Public services availability
- Emergency services response time

**Section 7: Individual Action Recommendations**
- Priority-ranked list
- Categories: Safety, Health, Financial, Travel
- Each action: Title, Description, Urgency, Steps
- Mark as completed

**Section 8: Authority Action Recommendations**
- Tabs: City | District | State
- Action list with priorities
- Resource requirements
- Expected outcomes
- Implementation tracking

#### Layout Structure
```
[Header]
[Sidebar]
[Main Content]
  ├─ City Header (full-width)
  ├─ Real-Time Metrics (6-card grid)
  ├─ Three-column layout
  │   ├─ Crime Index (33%)
  │   ├─ Health Index (33%)
  │   └─ Economic (33%)
  ├─ Civil Affairs (full-width)
  ├─ Two-column layout
  │   ├─ Individual Actions (50%)
  │   └─ Authority Actions (50%)
[Footer]
```

#### Visual Elements
- **Images**: City skyline photo (if available) or generic city icon
- **Icons**: Lucide icons for all categories
- **Charts**: Line charts, pie charts, gauge charts
- **Maps**: Mini map with city location marked

#### Animations
| Element | Animation | Trigger |
|---------|-----------|---------|
| Metrics | Number update | Data refresh |
| Charts | Real-time update | Data refresh |
| Alert badges | Pulse | When alert active |
| Action items | Slide in | Scroll into view |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| Timeframe selector | Click | Change chart period |
| Alert badge | Click | Open alert details |
| Action item | Click | Expand/collapse |
| Complete checkbox | Click | Mark action done |
| Refresh button | Click | Manual data refresh |

---

### 4.4 Page: predictions (Predictions Hub)

#### Purpose
Central hub for all predictive analytics including game theory simulations, astrological forecasts, and pattern recognition.

#### Sections

**Section 1: Page Header**
- Title: "Predictions Hub"
- Subtitle: "Multi-dimensional forecasting analysis"
- Last simulation run timestamp
- Global confidence score

**Section 2: Methodology Tabs**
- Tabs: Game Theory | Astrology | Pattern Mapping | Combined
- Tab indicator with smooth slide animation
- Each tab shows relevant predictions

**Section 3: Game Theory Simulation Panel**
- Interactive simulation controls
- Player/actor configuration
- Strategy matrix visualization
- Nash equilibrium indicators
- Scenario outcomes with probabilities
- Run simulation button with parameters

**Section 4: Astrological Forecast Calendar**
- Planetary position visualization
- Significant date markers
- Forecast confidence bands
- Historical accuracy metrics
- Aspect interpretations

**Section 5: Pattern Recognition Visualizations**
- Pattern type selector
- Historical pattern overlay
- Current trajectory projection
- Similar period finder
- Pattern confidence score

**Section 6: Confidence Indicators**
- Overall prediction confidence
- Per-methodology confidence
- Confidence trend over time
- Factors affecting confidence

**Section 7: Historical Accuracy Stats**
- Accuracy by prediction type
- Timeframe accuracy comparison
- Recent predictions review
- Calibration metrics

#### Layout Structure
```
[Header]
[Sidebar]
[Main Content]
  ├─ Page Header
  ├─ Methodology Tabs (sticky)
  ├─ Tab Content Area
  │   ├─ Game Theory: Controls + Visualization + Results
  │   ├─ Astrology: Calendar + Positions + Forecasts
  │   ├─ Pattern: Selector + Charts + Projections
  │   └─ Combined: Integrated view
  ├─ Confidence Dashboard (bottom)
  └─ Historical Accuracy (bottom)
[Footer]
```

#### Visual Elements
- **Icons**: Lucide icons for each methodology
- **Charts**: Complex visualizations, network graphs
- **Simulations**: Animated scenario playback

#### Animations
| Element | Animation | Trigger |
|---------|-----------|---------|
| Tab switch | Content fade/slide | Tab click |
| Simulation | Progress animation | Run click |
| Results | Stagger reveal | Complete |
| Charts | Draw animation | View |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| Tab | Click | Switch methodology |
| Simulation params | Change | Update preview |
| Run button | Click | Execute simulation |
| Chart point | Hover | Show details |
| Date | Click | View daily forecast |

---

### 4.5 Page: timeline (Timeline View)

#### Purpose
Historical and predicted events timeline with filtering and detailed event information.

#### Sections

**Section 1: Timeline Header**
- Title: "Global Events Timeline"
- View selector: Timeline | Calendar | List
- Date range selector
- Current view indicator

**Section 2: Navigation Controls**
- Zoom: Day | Week | Month | Year | Decade
- Pan controls: Previous | Today | Next
- Jump to date picker
- Quick filters: All | Historical | Predicted

**Section 3: Event Categories Filter**
- Checkboxes for each category:
  - Political
  - Economic
  - Health
  - Security
  - Environmental
  - Social
  - Technological
- Color-coded by category
- Select all/none options

**Section 4: Vertical Timeline**
- Central line with event nodes
- Events positioned by date
- Past events (left side)
- Future/predicted events (right side)
- Today marker (prominent)
- Event cards with:
  - Date
  - Category icon
  - Title
  - Brief description
  - Confidence (for predictions)
  - Source/verification

**Section 5: Event Detail Modal**
- Full event information
- Related events
- Sources
- Impact assessment
- For predictions: methodology used

**Section 6: Prediction Confidence Bands**
- Visual bands around predicted events
- Width indicates confidence range
- Color intensity indicates confidence level

#### Layout Structure
```
[Header]
[Sidebar]
[Main Content]
  ├─ Timeline Header
  ├─ Navigation Controls (sticky)
  ├─ Category Filters (collapsible)
  ├─ Timeline Visualization (scrollable)
  │   ├─ Central axis
  │   ├─ Event nodes (alternating sides)
  │   └─ Today marker
  └─ Event Detail (modal)
[Footer]
```

#### Visual Elements
- **Icons**: Category-specific Lucide icons
- **Timeline**: SVG-based with smooth scrolling
- **Event cards**: Color-coded borders

#### Animations
| Element | Animation | Trigger |
|---------|-----------|---------|
| Timeline | Parallax scroll | Scroll |
| Event nodes | Fade in | Scroll into view |
| Today marker | Pulse | Continuous |
| Modal | Scale + fade | Open |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| Event node | Click | Open detail modal |
| Zoom control | Click | Change scale |
| Category filter | Toggle | Show/hide events |
| Date picker | Select | Jump to date |
| Pan buttons | Click | Navigate timeline |

---

### 4.6 Page: alerts (Alert Center)

#### Purpose
Centralized alert management with comprehensive filtering and subscription capabilities.

#### Sections

**Section 1: Alert Center Header**
- Title: "Alert Center"
- Active alerts count
- Unacknowledged alerts indicator
- Mark all as read button
- Export alerts button

**Section 2: Alert Type Filters**
- 7 alert type buttons/toggles:
  1. Contamination (biohazard icon)
  2. Flight Risk (plane icon)
  3. Travel Risk (map icon)
  4. Tourist Risk (camera icon)
  5. Living/Death Risk (skull icon)
  6. Health Risk (heart-pulse icon)
  7. Economic Risk (trending-down icon)
- Each shows count badge
- Multi-select enabled

**Section 3: Severity Filters**
- 4 severity levels: Critical | High | Medium | Low
- Color-coded pills
- All selected by default

**Section 4: Geographic Filters**
- Region selector (continent/region)
- Country selector
- City selector (if country selected)
- Radius filter (if location-based)

**Section 5: Alert List**
- Card-based layout
- Sort options: Date | Severity | Type | Location
- Each card contains:
  - Alert type icon (colored)
  - Severity indicator
  - Title
  - Description (truncated)
  - Location
  - Timestamp
  - Acknowledge button
  - Details link

**Section 6: Alert Detail View**
- Full alert information
- Historical context
- Related alerts
- Recommended actions
- Update history

**Section 7: Subscription Management**
- Current subscriptions list
- Add new subscription form
- Alert type preferences
- Delivery method: Dashboard | Email | Push
- Frequency: Immediate | Daily Digest | Weekly

#### Layout Structure
```
[Header]
[Sidebar]
[Main Content]
  ├─ Alert Center Header
  ├─ Filter Sidebar (collapsible on mobile)
  │   ├─ Alert Type Filters
  │   ├─ Severity Filters
  │   └─ Geographic Filters
  ├─ Alert List (main area)
  │   ├─ Sort controls
  │   └─ Alert cards (infinite scroll)
  └─ Subscription Panel (bottom)
[Footer]
```

#### Visual Elements
- **Icons**: Lucide icons for each alert type
- **Badges**: Color-coded severity
- **Cards**: Alert-specific border colors

#### Animations
| Element | Animation | Trigger |
|---------|-----------|---------|
| New alert | Slide in + pulse | Real-time |
| Filter change | Cards fade/reorder | Filter click |
| Acknowledge | Card fade out | Button click |
| Severity | Background color pulse | Hover |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| Alert card | Click | Open detail |
| Filter | Toggle | Update list |
| Acknowledge | Click | Mark as read |
| Subscribe | Click | Add subscription |
| Sort | Select | Reorder list |

---

### 4.7 Page: settings (Settings)

#### Purpose
User preferences and bandwidth/performance management.

#### Sections

**Section 1: Settings Header**
- Title: "Settings"
- Subtitle: "Customize your dashboard experience"
- Reset to defaults button

**Section 2: Bandwidth Mode Selector**
- 3 radio options:
  - High: Full 3D, all animations, particle effects
  - Medium: Simplified 3D, reduced animations
  - Low: 2D map, minimal animations, data priority
- Visual preview for each mode
- Auto-detect button

**Section 3: Map Display Settings**
- 3D/2D toggle
- Texture quality selector
- Marker density slider
- Animation quality selector

**Section 4: Animation Preferences**
- Enable/disable animations toggle
- Animation speed selector
- Reduced motion option (accessibility)

**Section 5: Notification Settings**
- Enable notifications toggle
- Alert types to notify
- Minimum severity threshold
- Quiet hours settings

**Section 6: Data Refresh Rates**
- Real-time metrics refresh interval
- Dashboard data refresh interval
- Manual refresh option

**Section 7: Theme Preferences**
- Light/Dark/Auto mode
- Accent color picker
- Font size selector

**Section 8: Privacy & Data**
- Clear local data
- Export user data
- Data retention settings

#### Layout Structure
```
[Header]
[Sidebar]
[Main Content]
  ├─ Settings Header
  ├─ Settings Categories (left nav)
  │   ├─ Performance
  │   ├─ Display
  │   ├─ Notifications
  │   ├─ Data
  │   └─ Privacy
  └─ Settings Panels (right)
      ├─ Bandwidth Mode
      ├─ Map Settings
      ├─ Animation Preferences
      ├─ Notification Settings
      ├─ Data Refresh
      ├─ Theme
      └─ Privacy
[Footer]
```

#### Visual Elements
- **Icons**: Lucide icons for each category
- **Toggles**: Custom toggle switches
- **Sliders**: Range inputs
- **Previews**: Visual examples

#### Animations
| Element | Animation | Trigger |
|---------|-----------|---------|
| Toggle | Slide animation | Click |
| Preview | Update | Setting change |
| Category | Highlight | Selection |

#### Interactions
| Element | Action | Result |
|---------|--------|--------|
| Setting | Change | Apply immediately |
| Reset | Click | Restore defaults |
| Preview | Click | Show full preview |
| Save | Click | Persist settings |

---

## 5. Technical Requirements

### 5.1 CDN Libraries

```html
<!-- Tailwind CSS v4 -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- Three.js (for 3D globe - High/Medium bandwidth only) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- D3.js (for data visualizations) -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- Chart.js (for charts) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- GSAP (for advanced animations - optional) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

### 5.2 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### 5.3 Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Performance Score: > 80
- 60fps animations (High mode)
- 30fps animations (Medium mode)

### 5.4 Data Storage
- LocalStorage for user settings
- SessionStorage for temporary data
- IndexedDB for offline data (optional)

### 5.5 API Integration Points
- REST API for data fetching
- WebSocket for real-time alerts (High/Medium bandwidth)
- Polling fallback (Low bandwidth)

---

## 6. Image Requirements

| Page | Description | Search Keywords |
|------|-------------|-----------------|
| index | Earth texture for 3D globe | earth texture map satellite high resolution blue marble nasa planet surface |
| index | Night lights texture | earth night lights city lights satellite image global illumination |
| index | Bump/normal map for globe | earth bump map elevation terrain topographic relief |
| country | Country flags (all countries) | [country name] flag official high quality vector svg national |
| country | Country map silhouettes | [country name] map outline silhouette vector border shape |
| city | City skyline photos | [city name] skyline cityscape downtown urban architecture landmark |
| alerts | Alert type hero images | warning sign caution alert symbol danger risk hazard safety |
| predictions | Abstract prediction visualization | abstract data visualization futuristic technology network prediction analytics |
| timeline | Historical event imagery | historical timeline events world history significant moments global |
| settings | Bandwidth mode illustrations | internet speed connection network bandwidth data transfer technology |

### Icon Requirements (Lucide)
All icons from Lucide library. Key icons needed:
- Navigation: Globe, BarChart3, Calendar, Bell, Settings
- Threats: TrendingUp, Heart, Shield, Leaf, Landmark, Users
- Alerts: AlertTriangle, AlertOctagon, AlertCircle, Info
- Actions: Check, X, ChevronRight, ChevronDown, Search, Filter
- Map: MapPin, Navigation, Compass, Crosshair
- General: Menu, User, LogOut, Refresh, Download, Share

---

## 7. Navigation Structure

### 7.1 Sidebar Navigation

| Link Text | Target | Icon | Position | Badge |
|-----------|--------|------|----------|-------|
| Global Overview | index.html | Globe | sidebar | - |
| Predictions | predictions.html | Brain | sidebar | - |
| Timeline | timeline.html | Calendar | sidebar | - |
| Alert Center | alerts.html | Bell | sidebar | Alert count |
| Settings | settings.html | Settings | sidebar | - |

### 7.2 Header Navigation

| Link Text | Target | Position |
|-----------|--------|----------|
| Logo | index.html | header-left |
| Global Threat Level | - | header-center |
| Notifications | alerts.html | header-right |
| Settings | settings.html | header-right |
| User Profile | - | header-right |

### 7.3 Footer Navigation

| Link Text | Target | Position |
|-----------|--------|----------|
| About | #about | footer |
| Documentation | #docs | footer |
| API | #api | footer |
| Privacy | #privacy | footer |
| Terms | #terms | footer |
| Contact | #contact | footer |

### 7.4 Breadcrumb Structure
```
Global Overview > [Country] > [City]
Global Overview > Predictions > [Methodology]
Global Overview > Timeline > [Date Range]
Global Overview > Alerts > [Alert Type]
```

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 Level AA Compliance
- Color contrast ratio: 4.5:1 minimum for text
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators on all interactive elements
- Alt text for all images
- ARIA labels for icons and buttons

### 8.2 Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 8.3 Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| / | Focus search |
| Esc | Close modal/dropdown |
| Alt + 1-7 | Navigate to pages |
| Alt + A | Open alerts |
| Alt + S | Open settings |

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, sidebar as overlay, 2D map only |
| Tablet | 640px - 1023px | 2 columns, collapsible sidebar |
| Desktop | 1024px - 1439px | Full layout, fixed sidebar |
| Large Desktop | >= 1440px | Full layout, max-width container |

---

## 10. State Management

### 10.1 URL Parameters
```
?country=US - Pre-select country
?city=NYC - Pre-select city
?alert=123 - Open specific alert
?view=timeline - Set timeline view
?bandwidth=low - Set bandwidth mode
```

### 10.2 LocalStorage Keys
```
geoForecast_settings - User preferences
geoForecast_bandwidth - Bandwidth mode
geoForecast_alertsRead - Read alert IDs
geoForecast_subscriptions - Alert subscriptions
geoForecast_recent - Recently viewed locations
```

---

## Appendix A: Color Usage Quick Reference

### Alert Severity Colors
- Critical: #DC2626 (red-600)
- High: #F97316 (orange-500)
- Medium: #EAB308 (yellow-500)
- Low: #22C55E (green-500)
- Info: #3B82F6 (blue-500)

### UI State Colors
- Success: #22C55E
- Warning: #EAB308
- Error: #DC2626
- Info: #3B82F6
- Neutral: #6B7280

### Accent Usage
- Primary actions: #1E3A5F
- Secondary actions: #7C3AED
- Highlights: #FFD700
- Negative trends: #E85D4E
- Positive trends: #14B8A6

---

## Appendix B: Animation Timing Reference

### Standard Durations
- Micro (hover): 150ms
- Standard: 300ms
- Complex: 500ms
- Page transition: 700ms

### Easing Functions
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Stagger Patterns
- Cards: 50ms
- List items: 30ms
- Alerts: 100ms
- Globe markers: 80ms
