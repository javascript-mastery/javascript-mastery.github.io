import React from 'react';
import { motion } from 'framer-motion';
import { Users, GitFork, Star, Sparkles, Zap, Trophy, Github, ExternalLink, Command } from 'lucide-react';
import Link from '@docusaurus/Link';

const pathfinderCards = [
  {
    level: 'Beginner',
    icon: Sparkles,
    description: 'Start your JavaScript journey with fundamentals.',
    topics: ['Variables & Data Types', 'Functions & Scope', 'DOM Manipulation'],
    color: '#10b981', // Emerald
    bg: 'from-emerald-500/10 to-transparent'
  },
  {
    level: 'Intermediate',
    icon: Zap,
    description: 'Level up with advanced concepts and patterns.',
    topics: ['Async/Await', 'Closures', 'Design Patterns'],
    color: 'var(--ifm-color-primary)', // Blue
    bg: 'from-blue-500/10 to-transparent'
  },
  {
    level: 'Advanced',
    icon: Trophy,
    description: 'Master expert-level JavaScript techniques.',
    topics: ['Optimization', 'Architecture', 'Testing'],
    color: 'var(--accent)', // Yellow
    bg: 'from-[#f7df1e]/10 to-transparent'
  },
];

const githubStats = [
  { label: 'Stars', value: '15.2K', icon: Star, color: 'text-yellow-500' },
  { label: 'Contributors', value: '234', icon: Users, color: 'text-blue-500' },
  { label: 'Forks', value: '3.8K', icon: GitFork, color: 'text-purple-500' },
];

export const Community: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Theme Grid Background */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Command className="w-3 h-3" />
            <span>Project Stats</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Join the <span className="text-gradient">Movement</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Trusted by thousands of developers. We are building the world's most accessible JavaScript roadmap.
          </p>
        </div>

        {/* GitHub Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {githubStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl glass-effect border border-white/10 dark:border-white/5 flex flex-col items-center group hover:border-[var(--ifm-color-primary)]/30 transition-colors"
            >
              <stat.icon className={`w-10 h-10 text-[var(--ifm-color-primary)] mb-4 transition-transform group-hover:scale-110`} />
              <div className="text-4xl font-black text-[var(--ifm-color-primary)] mb-2">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Pathfinder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {pathfinderCards.map((path) => (
            <div key={path.level} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-b ${path.bg} rounded-3xl -z-10`} />
              <div className="p-8 h-full rounded-3xl border border-white/10 dark:border-white/5 glass-effect flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <path.icon className="w-6 h-6" style={{ color: path.color }} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                    Level: {path.level}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{path.level} Path</h3>
                <p className="text-[var(--text-secondary)] mb-6 flex-grow">{path.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {path.topics.map(topic => (
                    <li key={topic} className="flex items-center text-sm text-[var(--text-secondary)]">
                      <div className="w-1 h-1 rounded-full mr-3" style={{ backgroundColor: path.color }} />
                      {topic}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-white hover:text-black transition-all">
                  Start Track
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative p-1 rounded-3xl bg-gradient-to-r from-[var(--ifm-color-primary)] via-[var(--accent)] to-[var(--ifm-color-primary)] shadow-2xl"
        >
          <div className="bg-[var(--bg-surface)] rounded-[22px] p-10 md:p-16 relative overflow-hidden text-center">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-[100px] -z-10" />
            
            <h3 className="text-3xl md:text-5xl font-black mb-6">
              Open Source & <span className="text-[var(--ifm-color-primary)]">Free Forever</span>
            </h3>
            <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Contribute your knowledge or learn from others. Our mission is to keep high-quality 
              tech education accessible to every human on earth.
            </p>
            
            <div className="flex flex-wrap ms:flex-col md:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/javascript-mastery"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold transition-transform hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
                Contribute on GitHub
              </Link>
              <Link
                to="#"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
              >
                Browse Projects
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}