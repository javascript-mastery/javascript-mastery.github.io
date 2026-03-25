import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Github, Sparkles, Star } from 'lucide-react';
import Link from '@docusaurus/Link';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* 1. Background Layering */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-[var(--bg-surface)] -z-10" />
      
      {/* 2. Central Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--accent)] opacity-20 blur-[120px] rounded-full -z-10 animate-pulse" />

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-effect p-12 md:p-20 rounded-[3rem] border border-white/10 text-center overflow-hidden shadow-2xl"
        >
          {/* Decorative Corner Icons */}
          <Sparkles className="absolute top-8 left-8 text-[var(--accent)] opacity-20 w-8 h-8" />
          <Star className="absolute bottom-8 right-8 text-[var(--ifm-color-primary)] opacity-20 w-8 h-8" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Rocket Icon */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-20 h-20 bg-gradient-to-br from-[var(--accent)] to-orange-400 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(247,223,30,0.4)] mb-8 rotate-12"
            >
              <Rocket size={40} className="text-black -rotate-12" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
              Ready to <span className="text-gradient">Ship Better</span> Code?
            </h2>
            
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-xl mx-auto text-balance">
              Join 15,000+ developers mastering the JavaScript ecosystem. 
              The most comprehensive roadmap is just one click away.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link
                to="/docs/intro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-[var(--ifm-color-primary)] text-white rounded-2xl font-black text-lg transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95 no-underline hover:text-white"
              >
                Start Learning Now
                <ArrowRight size={20} />
              </Link>
              
              <a
                href="https://github.com/javascript-mastery"
                target="_blank"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-lg transition-all hover:bg-slate-900 dark:hover:bg-slate-100 active:scale-95 no-underline"
              >
                <Github size={20} />
                Star on GitHub
              </a>
            </div>

            {/* Micro-Social Proof */}
            <div className="mt-12 pt-8 border-t border-white/5 w-full">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-50">
                100% Free • Open Source • Forever
              </p>
            </div>
          </div>

          {/* Background Decorative "Code Snippets" */}
          <div className="absolute -bottom-10 -left-10 opacity-5 font-mono text-sm text-left rotate-12 select-none pointer-events-none hidden md:block">
            <pre>{`function master() {\n  return "success";\n}`}</pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};