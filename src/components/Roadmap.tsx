import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Sparkles, Zap, Trophy } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { roadmapModules } from '../data/roadmapData';
import { cn } from '../lib/utils';
import { PathLevel } from '../types';

const levelConfig: Record<PathLevel, { color: string; icon: typeof Sparkles; gradient: string }> = {
  Beginner: {
    color: 'text-green-500',
    icon: Sparkles,
    gradient: 'from-green-400 to-emerald-600',
  },
  Intermediate: {
    color: 'text-blue-500',
    icon: Zap,
    gradient: 'from-blue-400 to-cyan-600',
  },
  Advanced: {
    color: 'text-purple-500',
    icon: Trophy,
    gradient: 'from-purple-400 to-pink-600',
  },
};

export function Roadmap() {
  const { progress, toggleModule, getProgressPercentage, totalModules } = useProgress();
  const progressPercentage = getProgressPercentage();

  const groupedModules = roadmapModules.reduce((acc, module) => {
    if (!acc[module.level]) {
      acc[module.level] = [];
    }
    acc[module.level].push(module);
    return acc;
  }, {} as Record<PathLevel, typeof roadmapModules>);

  return (
    <div className="relative min-h-screen">
      <div className="sticky top-16 z-40 bg-[var(--bg-surface)] border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)]">
                Overall Progress
              </h3>
              <p className="text-2xl font-bold">
                {progress.completedModules.length} / {totalModules} Modules
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[var(--accent)]">
                {progressPercentage}%
              </div>
              <p className="text-sm text-[var(--text-secondary)]">Completed</p>
            </div>
          </div>
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Learning <span className="text-gradient">Roadmap</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Follow this structured path to master JavaScript. Check off modules as you
            complete them and track your progress.
          </p>
        </motion.div>

        {(['Beginner', 'Intermediate', 'Advanced'] as PathLevel[]).map((level, levelIndex) => {
          const modules = groupedModules[level] || [];
          const config = levelConfig[level];
          const LevelIcon = config.icon;
          const completedInLevel = modules.filter((m) =>
            progress.completedModules.includes(m.id)
          ).length;

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: levelIndex * 0.1 }}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={cn(
                    'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center',
                    config.gradient
                  )}
                >
                  <LevelIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold">{level}</h2>
                  <p className="text-[var(--text-secondary)]">
                    {completedInLevel} of {modules.length} modules completed
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

                <div className="space-y-6">
                  {modules.map((module, index) => {
                    const isCompleted = progress.completedModules.includes(module.id);

                    return (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="relative"
                      >
                        <div className="flex gap-6">
                          <button
                            onClick={() => toggleModule(module.id)}
                            className="relative z-10 flex-shrink-0 transition-transform hover:scale-110"
                            aria-label={`Toggle ${module.title}`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className={cn('w-12 h-12', config.color)} />
                            ) : (
                              <Circle className="w-12 h-12 text-[var(--text-secondary)]" />
                            )}
                          </button>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                              'flex-1 p-6 rounded-xl border transition-all cursor-pointer',
                              isCompleted
                                ? 'bg-[var(--accent)]/5 border-[var(--accent)]/30'
                                : 'bg-[var(--bg-surface)] border-white/10 hover:border-white/20'
                            )}
                            onClick={() => toggleModule(module.id)}
                          >
                            <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                            <p className="text-[var(--text-secondary)] mb-4">
                              {module.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {module.topics.map((topic) => (
                                <span
                                  key={topic}
                                  className={cn(
                                    'px-3 py-1 rounded-full text-sm font-medium',
                                    isCompleted
                                      ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                                      : 'bg-white/5 text-[var(--text-secondary)]'
                                  )}
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent)]/5 border border-[var(--accent)]/20 text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Keep Going!</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Your progress is automatically saved. Come back anytime to continue your
            learning journey.
          </p>
          {progressPercentage === 100 && (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-black rounded-lg font-semibold">
              <Trophy className="w-5 h-5" />
              Congratulations! You've completed the roadmap!
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
