import { motion } from 'framer-motion';
import { Users, GitFork, Star, Sparkles, Zap, Trophy } from 'lucide-react';
import Link from '@docusaurus/Link';
import { PathLevel } from '../types';

const pathfinderCards: Array<{
  level: PathLevel;
  icon: typeof Sparkles;
  description: string;
  topics: string[];
  color: string;
}> = [
  {
    level: 'Beginner',
    icon: Sparkles,
    description: 'Start your JavaScript journey with fundamentals',
    topics: ['Variables & Data Types', 'Functions & Scope', 'DOM Manipulation', 'ES6+ Basics'],
    color: 'from-green-400 to-emerald-600',
  },
  {
    level: 'Intermediate',
    icon: Zap,
    description: 'Level up with advanced concepts and patterns',
    topics: ['Async/Await', 'Closures', 'Prototypes', 'Design Patterns'],
    color: 'from-blue-400 to-cyan-600',
  },
  {
    level: 'Advanced',
    icon: Trophy,
    description: 'Master expert-level JavaScript techniques',
    topics: ['Performance Optimization', 'Build Tools', 'Testing', 'Architecture'],
    color: 'from-purple-400 to-pink-600',
  },
];

const githubStats = [
  { label: 'Stars', value: '15.2K', icon: Star },
  { label: 'Contributors', value: '234', icon: Users },
  { label: 'Forks', value: '3.8K', icon: GitFork },
];

export function Community() {
  return (
    <div className="relative">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our <span className="text-[var(--ifm-color-primary)]">Community</span>
            </h2>
            <p className="text-lg">
              Trusted by thousands of developers worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {githubStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-white/10 text-center"
                >
                  <Icon className="w-12 h-12 text-[var(--ifm-color-primary)] mx-auto mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-12 rounded-3xl bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/5 border border-[var(--accent)]/20 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Open Source & Free Forever
              </h3>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Built by the community, for the community. Contribute, learn, and grow
                together with developers from around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/javascript-mastery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[var(--ifm-color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--ifm-color-primary)] hover:text-white/50 transition-all"
                >
                  Contribute on GitHub
                </a>
                <Link
                  to="#"
                  className="px-8 py-4 border border-white rounded-lg font-semibold hover:bg-white/10 transition-all"
                >
                  Browse Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
