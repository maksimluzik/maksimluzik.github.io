import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * 3D Tilt Card Component
 * 
 * Creates a card with realistic 3D tilt effect on hover.
 * Uses Framer Motion for smooth spring animations.
 */
export function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(99, 102, 241, 0.3)',
  tiltAmount = 15,
  scale = 1.02,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for smooth animations
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  
  // Spring configs for smooth, natural movement
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  
  // Transform for scale
  const scaleTransform = useSpring(1, springConfig);
  
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Normalize to -1 to 1
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);
    
    // Apply tilt (inverted Y for natural feel)
    rotateX.set(-normalizedY * tiltAmount);
    rotateY.set(normalizedX * tiltAmount);
    
    // Update glow position (as percentage)
    const glowPosX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowPosY = ((e.clientY - rect.top) / rect.height) * 100;
    glowX.set(glowPosX);
    glowY.set(glowPosY);
  }, [rotateX, rotateY, glowX, glowY, tiltAmount]);
  
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    scaleTransform.set(scale);
  }, [scaleTransform, scale]);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scaleTransform.set(1);
    glowX.set(50);
    glowY.set(50);
  }, [rotateX, rotateY, scaleTransform, glowX, glowY]);
  
  // Generate glow gradient based on mouse position
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${glowColor}, transparent 50%)`
  );
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        scale: scaleTransform,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 transition-opacity duration-300"
        style={{
          background: glowBackground,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Card content */}
      <div
        className="relative z-20 h-full"
        style={{ transform: 'translateZ(20px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default TiltCard;
