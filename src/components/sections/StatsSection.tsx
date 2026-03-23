import React from 'react';
import { BookOpen, Code, Boxes, Map } from 'lucide-react';
import { Section } from '../ui/Section';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: BookOpen,
      value: '100+',
      label: 'JavaScript Guides',
      description: 'Comprehensive tutorials',
    },
    {
      icon: Code,
      value: '50+',
      label: 'Code Examples',
      description: 'Runnable snippets',
    },
    {
      icon: Boxes,
      value: '30+',
      label: 'Real Projects',
      description: 'Production-ready apps',
    },
    {
      icon: Map,
      value: '10+',
      label: 'Learning Paths',
      description: 'Structured roadmaps',
    },
  ];

  return (
    <Section background="gradient">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="text-center group"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="inline-flex p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg mb-4 group-hover:scale-110 transition-transform">
              <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.value}
            </div>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
              {stat.label}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Section>
  );
};
