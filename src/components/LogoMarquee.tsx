import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiJavascript, SiTypescript, SiReact, SiNodedotjs, 
  SiNextdotjs, SiTailwindcss, SiVite, SiGithub,
  SiVercel, SiMongodb, SiPostgresql, SiDocker
} from 'react-icons/si';

const techLogos = [
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiNextdotjs, name: 'Next.js', color: 'currentColor' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: SiVite, name: 'Vite', color: '#646CFF' },
  { icon: SiGithub, name: 'GitHub', color: 'currentColor' },
  { icon: SiVercel, name: 'Vercel', color: 'currentColor' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED' },
];

export const LogoMarquee: React.FC = () => {
  // We double the array to create a seamless infinite loop
  const duplicateLogos = [...techLogos, ...techLogos];

  return (
    <div className="py-12 bg-[var(--bg-surface)] border-y border-slate-200 dark:border-slate-800 overflow-hidden relative">
      {/* 1. Subtle Side Gradients for "Fade out" effect */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
          Comprehensive Mastery of Modern Web Tech
        </p>
      </div>

      {/* 2. Motion Container */}
      <div className="flex overflow-hidden group">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {duplicateLogos.map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 mx-8 md:mx-12 group/logo transition-all duration-300"
            >
              <tech.icon 
                className="w-8 h-8 md:w-10 md:h-10 transition-all duration-300 grayscale group-hover/logo:grayscale-0 group-hover/logo:scale-110" 
                style={{ color: tech.color }}
              />
              <span className="text-lg md:text-xl font-bold text-[var(--text-secondary)] group-hover/logo:text-[var(--ifm-color-primary)] transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Bottom Accent Line */}
      <div className="mt-10 mx-auto w-24 h-1 bg-[var(--accent)] rounded-full opacity-30" />
    </div>
  );
};