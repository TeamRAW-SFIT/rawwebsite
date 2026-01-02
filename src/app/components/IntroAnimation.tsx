'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 7000); // Video duration ~6 seconds + 1 second buffer

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0A1A3A 0%, #0F0F17 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        controls={false}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.95,
        }}
      >
        <source src="/Robotics_Intro_Animation_Generation.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(10, 26, 58, 0.4) 0%, rgba(15, 15, 23, 0.6) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <motion.div
        style={{
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Team RAW Text - Hidden to show video text */}
        <motion.div
          style={{
            display: 'none',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <h1
            style={{
              fontSize: '4rem',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: '900',
              margin: '0 0 0.5rem 0',
              color: 'var(--color-white)',
              letterSpacing: '3px',
              textShadow: '0 0 30px rgba(225, 6, 0, 0.8)',
            }}
          >
            TEAM <span style={{ color: 'var(--color-red)', textShadow: '0 0 40px rgba(225, 6, 0, 1)' }}>RAW</span>
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              fontFamily: 'Montserrat, sans-serif',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0.5rem 0 0 0',
              letterSpacing: '2px',
            }}
          >
            Robotics & Automation Wing
          </p>
        </motion.div>

        {/* Tagline - Hidden */}
        <motion.p
          style={{
            display: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          Where innovation meets engineering — building the future, one robot at a time.
        </motion.p>
      </motion.div>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '2rem',
          padding: '0.75rem 2rem',
          background: 'rgba(225, 6, 0, 0.2)',
          color: 'var(--color-white)',
          border: '2px solid var(--color-red)',
          borderRadius: '4px',
          fontSize: '0.9rem',
          fontFamily: 'Montserrat, sans-serif',
          cursor: 'pointer',
          zIndex: 3,
          fontWeight: '600',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
        }}
        whileHover={{
          background: 'var(--color-red)',
          boxShadow: '0 0 30px rgba(225, 6, 0, 0.8)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Skip Intro →
      </motion.button>

      {/* Loading Indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '5rem',
          zIndex: 3,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          style={{
            width: '80px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-red), #00D4FF)',
              width: '100%',
            }}
            animate={{ scaleX: [0, 1] }}
            transition={{
              duration: 5.5,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
