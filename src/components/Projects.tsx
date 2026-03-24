import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { projects } from '../data/projectsData';
// import { useProgress } from '../contexts/ProgressContext';
import { cn } from '../lib/utils';
import { Difficulty } from '../types';

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-500/20 text-green-500 border-green-500/30',
  Medium: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  Hard: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
};

export function Projects() {
  const [filter, setFilter] = useState<Difficulty | 'All'>('All');
  // const { progress, toggleProject } = useProgress();

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.difficulty === filter);

  // const completedCount = projects.filter((p) =>
  //   progress.completedProjects.includes(p.id)
  // ).length;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Project <span className="text-gradient">Hub</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8">
            Practice your skills with real-world projects. Each project is designed to
            reinforce what you've learned.
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--bg-surface)] rounded-lg border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-medium">
              {/* {completedCount} of {projects.length} Projects Completed */}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(['All', 'Easy', 'Medium', 'Hard'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all',
                filter === level
                  ? 'bg-[var(--accent)] text-black'
                  : 'bg-[var(--bg-surface)] border border-white/10 hover:border-white/20'
              )}
            >
              {level}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            // const isCompleted = progress.completedProjects.includes(project.id);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                // className={cn(
                //   'group relative p-6 rounded-2xl border transition-all',
                //   isCompleted
                //  //   ? 'bg-[var(--accent)]/5 border-[var(--accent)]/30'
                //     : 'bg-[var(--bg-surface)] border-white/10 hover:border-white/20'
                // )}
                className='group relative p-6 rounded-2xl border transition-all'

              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-semibold border',
                      difficultyColors[project.difficulty]
                    )}
                  >
                    {project.difficulty}
                  </span>

                  <button
                    onClick={() => toggleProject(project.id)}
                    className="transition-transform hover:scale-110"
                    // aria-label={`Mark ${project.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
                    aria-label={`Mark ${project.title} as 'Comming Soon...'`}
                  >
                    <CheckCircle2
                      // className={cn(
                      //   'w-6 h-6 transition-colors',
                      //   isCompleted
                      //  //   ? 'text-[var(--accent)] fill-[var(--accent)]'
                      //     : 'text-[var(--text-secondary)]'
                      // )}
                      className='w-6 h-6 transition-colors'
                    />
                  </button>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-white/5 text-xs text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:gap-3 transition-all"
                >
                  View Repository
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[var(--text-secondary)] text-lg">
              No projects found for this difficulty level.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
