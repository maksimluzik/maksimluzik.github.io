# Maksim Luzik - Personal Portfolio

A sophisticated minimalist personal website built with modern web technologies.

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + Canvas particle system
- **Deployment**: GitHub Actions → GitHub Pages

## Features

### Interactive Elements
- **Particle System**: High-performance canvas animation with mouse interaction
- **Bento Grid**: Card-based navigation with 3D tilt effects
- **Command Palette**: Spotlight-style search (⌘K / Ctrl+K)
- **Quote Display**: Dynamic motivational quotes

### Performance
- Code splitting (vendor, motion libraries)
- Optimized for Core Web Vitals (LCP, CLS, INP)
- Responsive design with adaptive particle count

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Automated via GitHub Actions on push to `master`:
1. Build React app with Vite
2. Deploy to GitHub Pages
3. Site available at `https://maksimluzik.github.io`

## Project Structure

```
src/
├── components/         # React components
│   ├── ParticleCanvas.jsx
│   ├── TiltCard.jsx
│   ├── BentoGrid.jsx
│   ├── Hero.jsx
│   ├── CommandPalette.jsx
│   └── QuoteDisplay.jsx
├── hooks/             # Custom React hooks
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Tailwind + custom styles

images/
├── backgrounds/       # Background images
├── profile/          # Profile photos
└── portfolio/        # Project screenshots
```
