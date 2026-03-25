import React from 'react';
import { 
  Code, 
  BookMarked, 
  Play, 
  Rocket, 
  Github, 
  Users, 
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Github,
      title: 'Open Source Heart',
      description: '100% transparent codebase. We believe in the power of community-driven education.',
      gradient: 'from-[#f7df1e]/20 to-transparent',
      isHighlight: true,
    },
    {
      icon: BookMarked,
      title: 'Modern Curriculum',
      description: 'Beyond console.log(). Master ES2024+, Node.js, and high-level architecture.',
      gradient: 'from-blue-500/20 to-transparent',
    },
    {
      icon: Code,
      title: 'Live Lab Environment',
      description: 'Execute code directly in your browser with our custom-built interactive runner.',
      gradient: 'from-emerald-500/20 to-transparent',
    },
    {
      icon: Play,
      title: 'Video Breakdowns',
      description: 'Visual learners welcome. Every guide comes with high-quality video walkthroughs.',
      gradient: 'from-orange-500/20 to-transparent',
    },
    {
      icon: Users,
      title: 'Global Mentorship',
      description: 'Connect with senior engineers and peers in our dedicated learning channels.',
      gradient: 'from-purple-500/20 to-transparent',
    },
    {
      icon: Rocket,
      title: 'Production Ready',
      description: 'Shift from tutorials to building real-world apps that users actually love.',
      gradient: 'from-rose-500/20 to-transparent',
    },
  ];

  return (
    <Section className="relative overflow-hidden py-24">
      {/* Your Custom Grid Background from CSS */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent-dark)] text-sm font-bold mb-4 border border-[var(--accent)]/20"
            >
              <Heart className="w-3 h-3 fill-current" />
              <span>Public Good Project</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-balance">
              The platform built by <span className="text-[var(--ifm-color-primary)]">Engineers</span>
            </h2>
          </div>
          <p className="text-lg text-[var(--text-secondary)] max-w-sm">
            Everything you need to master JavaScript is right here free, open, and community-verified.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                hover 
                className={`group relative h-full p-8 glass-effect border-white/10 dark:border-white/5 overflow-hidden transition-all duration-300 ${
                  feature.isHighlight ? 'border-[var(--accent)]/30 ring-1 ring-[var(--accent)]/10' : ''
                }`}
              >
                {/* Subtle Hover Gradient Flare */}
                <div className={`absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br ${feature.gradient} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl mb-6 shadow-inner transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-300 ${
                    feature.isHighlight 
                      ? 'bg-[var(--accent)] text-black' 
                      : 'bg-[var(--bg-surface)] text-[var(--ifm-color-primary)] border border-white/10'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group-hover:text-[var(--ifm-color-primary)] transition-colors">
                    {feature.title}
                    {feature.isHighlight && <span className="text-[10px] bg-[var(--accent)]/20 text-[var(--accent-dark)] px-2 py-0.5 rounded uppercase tracking-tighter">Core</span>}
                  </h3>

                  <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-[var(--ifm-color-primary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    Learn More <ArrowUpRight className="ml-1 w-3 h-3" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};