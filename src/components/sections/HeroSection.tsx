import React from 'react';
import { ArrowRight, Code2, Sparkles, Terminal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-surface)] pt-10 pb-16">
      {/* 1. Theme-Specific Background Grid */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 -z-10" />
      
      {/* 2. Brand Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,var(--accent)_0%,transparent_50%)] opacity-20 dark:opacity-10 -z-10" />

      <Container maxWidth="xl" className="relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Featured Badge */}
            <div className="inline-flex items-center space-x-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-[var(--accent-dark)]" />
              <span className="text-sm font-bold text-[var(--accent-dark)] tracking-wide uppercase">
                Open Source Learning Platform
              </span>
            </div>

            {/* Main Heading using your .text-gradient class */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter">
              JavaScript <br />
              <span className="text-[var(--ifm-color-primary)] inline-block py-2">Mastery Hub</span>
            </h1>

            <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl text-balance">
              The ultimate open-source resource for modern JavaScript. Master the language, explore the ecosystem, and contribute to the future of web education.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[var(--ifm-color-primary)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-white px-8 h-14 rounded-xl group">
                Start Learning Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-slate-200 dark:border-slate-800 h-14 px-8 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900">
                View Roadmap
              </Button>
            </div>

            {/* Stats Section with Theme Colors */}
            <div className="flex items-center space-x-10 pt-4 border-t border-slate-200 dark:border-slate-800">
              {[
                { label: 'Guides', val: '100+' },
                { label: 'Projects', val: '30+' },
                { label: 'Contributors', val: '200+' }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-[var(--ifm-color-primary)] mb-2">{stat.val}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual Column (Animated Code Editor) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Floating Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[var(--accent)] rounded-full blur-[80px] opacity-30 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--ifm-color-primary)] rounded-full blur-[80px] opacity-20" />

            {/* The Code Window */}
            <div className="relative glass-effect bg-slate-950/90 rounded-2xl shadow-2xl border border-white/10 dark:border-white/5 overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <Terminal className="w-3 h-3 mr-2" />
                  main.js
                </div>
              </div>

              {/* Code Content */}
              <div className="p-8 font-mono text-sm sm:text-base leading-relaxed">
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">1</span>
                  <span className="text-[#c678dd]">import</span>
                  <span className="text-white ml-2">{'{'} Community {'}'}</span>
                  <span className="text-[#c678dd] ml-2">from</span>
                  <span className="text-[#98c379] ml-2">'@js-mastery'</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">2</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">3</span>
                  <span className="text-[#e06c75]">function</span>
                  <span className="text-[#61afef] ml-2">igniteSuccess</span>
                  <span className="text-white">() {'{'}</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">4</span>
                  <span className="text-[#d19a66] ml-8">return</span>
                  <span className="text-white ml-2">new</span>
                  <span className="text-[#e5c07b] ml-2">Mastery</span>
                  <span className="text-white">({'{'}</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">5</span>
                  <span className="text-white ml-12">openSource:</span>
                  <span className="text-[#d19a66] ml-2">true</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">6</span>
                  <span className="text-white ml-8">{'}'});</span>
                </div>
                <div className="flex">
                  <span className="text-slate-600 w-8 shrink-0">7</span>
                  <span className="text-white">{'}'}</span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="px-6 py-3 bg-[var(--accent)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-tighter">
                  <Code2 className="w-4 h-4" />
                  Ready to contribute
                </div>
                <ChevronRight className="w-4 h-4 text-black" />
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};