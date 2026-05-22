import { Box } from '@mui/material';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

const emojiData = [
  { emoji: '🎭', top: 5, left: 8, size: '40px' },
  { emoji: '⚽', top: 15, left: 15, size: '45px' },
  { emoji: '🚴', top: 25, left: 5, size: '38px' },
  { emoji: '🎵', top: 35, left: 12, size: '42px' },
  { emoji: '📸', top: 45, left: 8, size: '40px' },
  { emoji: '☕', top: 55, left: 10, size: '36px' },
  { emoji: '🍕', top: 65, left: 6, size: '44px' },
  { emoji: '🎮', top: 75, left: 14, size: '38px' },
  { emoji: '💪', top: 85, left: 9, size: '42px' },
  { emoji: '🎨', top: 10, left: 88, size: '40px' },
  { emoji: '📚', top: 20, left: 92, size: '36px' },
  { emoji: '🎧', top: 30, left: 86, size: '44px' },
  { emoji: '📍', top: 40, left: 90, size: '38px' },
  { emoji: '☀️', top: 50, left: 94, size: '46px' },
  { emoji: '🌂', top: 60, left: 88, size: '40px' },
  { emoji: '🎁', top: 70, left: 91, size: '42px' },
  { emoji: '❤️', top: 80, left: 87, size: '38px' },
  { emoji: '⭐', top: 8, left: 45, size: '36px' },
  { emoji: '✨', top: 12, left: 55, size: '40px' },
  { emoji: '🏆', top: 88, left: 48, size: '44px' },
  { emoji: '🎯', top: 92, left: 58, size: '38px' },
  { emoji: '🚀', top: 6, left: 70, size: '42px' },
  { emoji: '🎪', top: 90, left: 72, size: '40px' },
  { emoji: '🎸', top: 18, left: 25, size: '46px' },
  { emoji: '🏀', top: 22, left: 82, size: '40px' },
  { emoji: '🎬', top: 95, left: 30, size: '38px' },
  { emoji: '🍿', top: 72, left: 78, size: '36px' },
  { emoji: '🎉', top: 42, left: 50, size: '48px' }
];

export default function FloatingIcons() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {emojiData.map((item, index) => {
        const { emoji, top, left, size } = item;

        return (
          <InteractiveEmoji
            key={index}
            emoji={emoji}
            top={top}
            left={left}
            size={size}
            mousePos={mousePos}
            index={index}
          />
        );
      })}
    </Box>
  );
}

function InteractiveEmoji({ emoji, top, left, size, mousePos, index }: any) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const emojiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (emojiRef.current) {
      const rect = emojiRef.current.getBoundingClientRect();
      const emojiX = rect.left + rect.width / 2;
      const emojiY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mousePos.x - (left * window.innerWidth / 100), 2) +
        Math.pow(mousePos.y - (top * window.innerHeight / 100), 2)
      );

      const repelDistance = 150;

      if (distance < repelDistance && distance > 0) {
        const angle = Math.atan2(
          (top * window.innerHeight / 100) - mousePos.y,
          (left * window.innerWidth / 100) - mousePos.x
        );

        const force = (repelDistance - distance) / repelDistance;
        const offsetX = Math.cos(angle) * force * 100;
        const offsetY = Math.sin(angle) * force * 100;

        setOffset({ x: offsetX, y: offsetY });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    }
  }, [mousePos, top, left]);

  return (
    <motion.div
      ref={emojiRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 0.5,
        scale: 1,
        x: offset.x,
        y: offset.y
      }}
      transition={{
        opacity: { duration: 1, delay: index * 0.05 },
        scale: { duration: 1, delay: index * 0.05 },
        x: { type: 'spring', stiffness: 150, damping: 15 },
        y: { type: 'spring', stiffness: 150, damping: 15 }
      }}
      whileHover={{
        scale: 1.4,
        rotate: 15,
        opacity: 1,
        transition: { duration: 0.3 }
      }}
      onClick={() => {
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        setOffset({ x: randomX, y: randomY });
        setTimeout(() => setOffset({ x: 0, y: 0 }), 1000);
      }}
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        pointerEvents: 'auto',
        cursor: 'pointer',
        fontSize: size,
        filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
      }}
    >
      {emoji}
    </motion.div>
  );
}
