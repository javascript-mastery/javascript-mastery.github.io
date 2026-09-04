import React, { JSX, useState } from 'react';
import Layout from '@theme/Layout';

interface RoadmapStep {
  title: string;
  description: string;
  topics: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const roadmaps: Record<string, RoadmapStep[]> = {
  frontend: [
    {
      title: '1. Web Foundations',
      description: 'Master core structure, layout algorithms, and semantic accessibility.',
      topics: ['Semantic HTML5', 'CSS Flexbox & Grid', 'Responsive Design', 'DOM Manipulation'],
      level: 'Beginner'
    },
    {
      title: '2. Modern JavaScript & TypeScript',
      description: 'Deep dive into asynchronous execution, dynamic types, and functional patterns.',
      topics: ['ES6+ Syntax', 'Promises & Async/Await', 'TypeScript Interfaces', 'Event Loop'],
      level: 'Intermediate'
    },
    {
      title: '3. Component Frameworks & Performance',
      description: 'Build single-page and server-rendered web architectures at scale.',
      topics: ['React / Next.js', 'State Management', 'Web Vitals', 'SSR & ISR'],
      level: 'Advanced'
    }
  ],
  backend: [
    {
      title: '1. Runtimes & Server Architecture',
      description: 'Understand event-driven non-blocking I/O and HTTP fundamentals.',
      topics: ['Node.js Fundamentals', 'Express / Fastify', 'RESTful APIs', 'Middleware Design'],
      level: 'Beginner'
    },
    {
      title: '2. Databases & Persistence',
      description: 'Manage relational and document databases with modern ORMs.',
      topics: ['PostgreSQL & SQL', 'MongoDB', 'Prisma ORM', 'Database Indexing'],
      level: 'Intermediate'
    },
    {
      title: '3. Microservices & DevOps',
      description: 'Deploy, scale, and secure enterprise application backends.',
      topics: ['Docker & Containers', 'CI/CD Pipelines', 'Authentication & JWT', 'Redis Caching'],
      level: 'Advanced'
    }
  ]
};

export default function Roadmaps(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend');

  return (
    <Layout title="Learning Roadmaps" description="Step-by-step developer learning paths">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              Curriculum Paths
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
              Interactive Developer Roadmaps
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Follow step-by-step learning tracks tailored to take you from foundational syntax to production engineer.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('frontend')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                activeTab === 'frontend'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Frontend Engineering
            </button>
            <button
              onClick={() => setActiveTab('backend')}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                activeTab === 'backend'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
              }`}
            >
              Backend Engineering
            </button>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-6">
            {roadmaps[activeTab].map((step, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{step.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full border border-amber-500/20">
                    {step.level}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{step.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {step.topics.map((topic, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-lg font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </Layout>
  );
}