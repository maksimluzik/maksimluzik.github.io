import { useRef } from 'react';
import useParticleSystem from '../hooks/useParticleSystem';

/**
 * ParticleCanvas Component
 * 
 * A full-screen canvas overlay for the particle system.
 * Uses pointer-events: none to allow interaction with elements below.
 */
export function ParticleCanvas({ className = '' }) {
  const canvasRef = useRef(null);
  
  // Initialize the particle system
  useParticleSystem(canvasRef);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
      style={{
        // Ensure canvas doesn't affect layout
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}

export default ParticleCanvas;
