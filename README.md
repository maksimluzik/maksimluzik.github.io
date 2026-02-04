# Maksim Luzik - Personal Portfolio

A sophisticated minimalist personal website built with modern web technologies.

## Architecture Overview

### Tech Stack
- **Framework**: Vite + React 18
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion + Canvas API
- **Performance**: Optimized for Core Web Vitals

### Particle System Design

The particle system uses a high-performance Canvas API approach with several optimization techniques:

1. **Typed Arrays (Float32Array)**: Particle data is stored in contiguous memory using Structure of Arrays (SoA) pattern to minimize garbage collection and improve cache efficiency.

2. **Single Draw Call**: All particles are rendered in a single animation frame using batch rendering, avoiding the overhead of individual DOM updates.

3. **Delta-Time Scaling**: Animation is frame-rate independent, ensuring consistent behavior across 30fps, 60fps, and 120fps displays.

4. **Mouse Event Throttling**: Mouse movements are throttled to ~60fps to reduce event processing overhead without affecting perceived smoothness.

5. **Adaptive Particle Count**: Automatically detects device capability (mobile vs desktop) and adjusts particle count accordingly.

6. **Object Pooling**: Particles are recycled from a fixed pool to avoid allocations during animation.

### Navigation Concepts

#### Interactive Bento Grid
A CSS Grid-based layout with variable-sized cards representing different sections:
- Uses Framer Motion for smooth enter/exit animations
- 3D tilt effect on hover using transform matrix calculations
- Glassmorphism effects with backdrop-filter
- Full keyboard navigation support

#### Command Palette
A spotlight-style fuzzy search interface:
- Triggered with ⌘K / Ctrl+K
- Fuzzy search across labels, categories, and keywords
- Full keyboard navigation (↑↓ Enter Escape)
- ARIA-compliant for screen readers

## Performance Optimizations

### Core Web Vitals

1. **LCP (Largest Contentful Paint)**:
   - Font preloading with `display=swap`
   - Critical CSS inlined
   - Hero image with `loading="eager"`

2. **CLS (Cumulative Layout Shift)**:
   - Fixed dimensions on images
   - Font fallback matching
   - Skeleton states for dynamic content

3. **FID/INP (First Input Delay / Interaction to Next Paint)**:
   - Event handlers use `passive: true` where applicable
   - Heavy computations moved to requestAnimationFrame
   - React 18 automatic batching

### Bundle Optimization
- Code splitting for vendor and motion libraries
- Tree-shaking enabled
- CSS code splitting
- Terser minification with console stripping

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ParticleCanvas.jsx    # Canvas particle system
│   ├── TiltCard.jsx          # 3D tilt card component
│   ├── BentoGrid.jsx         # Bento navigation grid
│   ├── Hero.jsx              # Hero section
│   ├── CommandPalette.jsx    # Spotlight search
│   └── index.js              # Component exports
├── hooks/
│   └── useParticleSystem.js  # Particle physics hook
├── App.jsx                   # Main app component
├── main.jsx                  # React entry point
└── index.css                 # Tailwind + custom styles
```

## Accessibility (A11y)

- Full keyboard navigation support
- ARIA labels and roles on interactive elements
- Focus indicators for keyboard users
- Reduced motion support (prefers-reduced-motion)
- Screen reader compatible command palette

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - Maksim Luzik
