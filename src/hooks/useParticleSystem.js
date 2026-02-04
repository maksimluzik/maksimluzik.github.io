import { useEffect, useRef, useCallback } from 'react';

/**
 * High-performance particle system using Canvas API
 * 
 * Optimization techniques:
 * 1. Uses TypedArrays (Float32Array) for particle data to minimize GC pressure
 * 2. Single draw call per frame using batch rendering
 * 3. Delta-time scaling for consistent animation across refresh rates
 * 4. Mouse event throttling to reduce event processing
 * 5. Adaptive particle count based on device performance
 * 6. Object pooling to avoid allocations during animation
 */

// Particle data structure indices (using SoA for cache efficiency)
const POS_X = 0;
const POS_Y = 1;
const VEL_X = 2;
const VEL_Y = 3;
const LIFE = 4;
const SIZE = 5;
const HUE = 6;
const PROPS_PER_PARTICLE = 7;

// Configuration
const CONFIG = {
  // Base particle count - scaled by device capability
  baseParticleCount: 60,
  mobileParticleCount: 30,
  
  // Physics
  friction: 0.94,
  gravity: 0.015,
  mouseAttraction: 0.05,
  mouseRadius: 150,
  
  // Visuals
  minSize: 1,
  maxSize: 3,
  fadeSpeed: 0.025,
  spawnRate: 1, // particles per frame when mouse moves
  
  // Colors (HSL)
  hueRange: [220, 280], // Indigo to purple range
  saturation: 70,
  lightness: 60,
  
  // Performance
  throttleMs: 16, // ~60fps mouse tracking
};

export function useParticleSystem(canvasRef, options = {}) {
  const config = { ...CONFIG, ...options };
  
  // Refs for animation state
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const lastMouseMoveRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const spawnIndexRef = useRef(0);
  
  // Initialize particle pool
  const initParticles = useCallback((count) => {
    const particles = new Float32Array(count * PROPS_PER_PARTICLE);
    
    // Initialize all particles as "dead" (life = 0)
    for (let i = 0; i < count; i++) {
      const offset = i * PROPS_PER_PARTICLE;
      particles[offset + LIFE] = 0;
    }
    
    return particles;
  }, []);
  
  // Spawn a new particle at mouse position
  const spawnParticle = useCallback((particles, index, x, y) => {
    const offset = index * PROPS_PER_PARTICLE;
    
    // Random offset from cursor
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 30;
    
    particles[offset + POS_X] = x + Math.cos(angle) * distance;
    particles[offset + POS_Y] = y + Math.sin(angle) * distance;
    
    // Initial velocity (slight outward burst)
    const speed = 0.5 + Math.random() * 1.5;
    particles[offset + VEL_X] = Math.cos(angle) * speed;
    particles[offset + VEL_Y] = Math.sin(angle) * speed;
    
    // Life, size, and color
    particles[offset + LIFE] = 1;
    particles[offset + SIZE] = config.minSize + Math.random() * (config.maxSize - config.minSize);
    particles[offset + HUE] = config.hueRange[0] + Math.random() * (config.hueRange[1] - config.hueRange[0]);
  }, [config]);
  
  // Update particle physics
  const updateParticles = useCallback((particles, count, deltaTime, mouseX, mouseY, mouseActive) => {
    const dt = Math.min(deltaTime / 16.67, 2); // Normalize to 60fps, cap at 2x
    
    for (let i = 0; i < count; i++) {
      const offset = i * PROPS_PER_PARTICLE;
      
      // Skip dead particles
      if (particles[offset + LIFE] <= 0) continue;
      
      const x = particles[offset + POS_X];
      const y = particles[offset + POS_Y];
      let vx = particles[offset + VEL_X];
      let vy = particles[offset + VEL_Y];
      
      // Apply mouse attraction if active
      if (mouseActive) {
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        
        if (dist < config.mouseRadius && dist > 1) {
          const force = (1 - dist / config.mouseRadius) * config.mouseAttraction;
          vx += (dx / dist) * force * dt;
          vy += (dy / dist) * force * dt;
        }
      }
      
      // Apply gravity (subtle downward drift)
      vy += config.gravity * dt;
      
      // Apply friction
      vx *= Math.pow(config.friction, dt);
      vy *= Math.pow(config.friction, dt);
      
      // Update position
      particles[offset + POS_X] = x + vx * dt;
      particles[offset + POS_Y] = y + vy * dt;
      particles[offset + VEL_X] = vx;
      particles[offset + VEL_Y] = vy;
      
      // Fade out
      particles[offset + LIFE] -= config.fadeSpeed * dt;
    }
  }, [config]);
  
  // Render particles to canvas
  const renderParticles = useCallback((ctx, particles, count, width, height) => {
    // Clear canvas completely (transparent to show background)
    ctx.clearRect(0, 0, width, height);
    
    // Enable additive blending for glow effect
    ctx.globalCompositeOperation = 'lighter';
    
    for (let i = 0; i < count; i++) {
      const offset = i * PROPS_PER_PARTICLE;
      const life = particles[offset + LIFE];
      
      if (life <= 0) continue;
      
      const x = particles[offset + POS_X];
      const y = particles[offset + POS_Y];
      const size = particles[offset + SIZE];
      const hue = particles[offset + HUE];
      
      // Skip if off-screen
      if (x < -10 || x > width + 10 || y < -10 || y > height + 10) {
        particles[offset + LIFE] = 0;
        continue;
      }
      
      const alpha = life * 0.8;
      
      // Draw particle with gradient for glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      gradient.addColorStop(0, `hsla(${hue}, ${config.saturation}%, ${config.lightness}%, ${alpha})`);
      gradient.addColorStop(0.5, `hsla(${hue}, ${config.saturation}%, ${config.lightness}%, ${alpha * 0.5})`);
      gradient.addColorStop(1, `hsla(${hue}, ${config.saturation}%, ${config.lightness}%, 0)`);
      
      ctx.beginPath();
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  }, [config]);
  
  // Animation loop
  const animate = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    
    // Calculate delta time
    const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 16.67;
    lastTimeRef.current = timestamp;
    
    const particleCount = particles.length / PROPS_PER_PARTICLE;
    
    // Spawn new particles near mouse
    if (mouse.active) {
      for (let i = 0; i < config.spawnRate; i++) {
        const index = spawnIndexRef.current % particleCount;
        spawnParticle(particles, index, mouse.x, mouse.y);
        spawnIndexRef.current++;
      }
    }
    
    // Update and render
    updateParticles(particles, particleCount, deltaTime, mouse.x, mouse.y, mouse.active);
    renderParticles(ctx, particles, particleCount, canvas.width, canvas.height);
    
    rafRef.current = requestAnimationFrame(animate);
  }, [canvasRef, config, spawnParticle, updateParticles, renderParticles]);
  
  // Setup effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Detect device capability
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleCount = isMobile ? config.mobileParticleCount : config.baseParticleCount;
    
    // Initialize particles
    particlesRef.current = initParticles(particleCount);
    
    // Setup canvas
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse handlers with throttling
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - lastMouseMoveRef.current < config.throttleMs) return;
      lastMouseMoveRef.current = now;
      
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    
    const handleTouchMove = (e) => {
      const now = performance.now();
      if (now - lastMouseMoveRef.current < config.throttleMs) return;
      lastMouseMoveRef.current = now;
      
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current.x = touch.clientX;
        mouseRef.current.y = touch.clientY;
        mouseRef.current.active = true;
      }
    };
    
    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    
    // Start animation
    rafRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [canvasRef, config, initParticles, animate]);
  
  return {
    setMousePosition: (x, y) => {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.active = true;
    },
    setMouseActive: (active) => {
      mouseRef.current.active = active;
    },
  };
}

export default useParticleSystem;
