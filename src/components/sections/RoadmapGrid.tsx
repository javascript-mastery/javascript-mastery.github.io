import React from 'react';
import { BookOpen, Zap, Globe, MousePointer, Timer, Sparkles, Boxes, Server, LayoutGrid as Layout, TestTube, Gauge, Shield, Wrench } from 'lucide-react';
import { RoadmapCard } from '../roadmap/RoadmapCard';
import { Section } from '../ui/Section';

export const RoadmapGrid: React.FC = () => {
  const roadmapItems = [
    {
      icon: BookOpen,
      title: 'JavaScript Basics',
      description: 'Start your journey with JavaScript fundamentals, syntax, and core concepts.',
      topics: ['Variables', 'Data Types', 'Operators', 'Control Flow'],
      href: '#basics',
      level: 'beginner' as const,
    },
    {
      icon: Zap,
      title: 'JavaScript Advanced',
      description: 'Deep dive into advanced concepts like closures, prototypes, and functional programming.',
      topics: ['Closures', 'Prototypes', 'OOP', 'Functional Programming'],
      href: '#advanced',
      level: 'advanced' as const,
    },
    {
      icon: Globe,
      title: 'Browser APIs',
      description: 'Learn to interact with browser features and web platform APIs.',
      topics: ['Fetch API', 'Storage', 'Geolocation', 'WebRTC'],
      href: '#browser-apis',
      level: 'intermediate' as const,
    },
    {
      icon: MousePointer,
      title: 'DOM & Events',
      description: 'Master DOM manipulation and event handling for interactive web apps.',
      topics: ['DOM Traversal', 'Event Listeners', 'Delegation', 'Custom Events'],
      href: '#dom-events',
      level: 'beginner' as const,
    },
    {
      icon: Timer,
      title: 'Async JavaScript',
      description: 'Handle asynchronous operations with callbacks, promises, and async/await.',
      topics: ['Promises', 'Async/Await', 'Event Loop', 'Error Handling'],
      href: '#async',
      level: 'intermediate' as const,
    },
    {
      icon: Sparkles,
      title: 'ES6+ Features',
      description: 'Explore modern JavaScript features and syntax improvements.',
      topics: ['Arrow Functions', 'Destructuring', 'Modules', 'Template Literals'],
      href: '#es6',
      level: 'intermediate' as const,
    },
    {
      icon: Boxes,
      title: 'Design Patterns',
      description: 'Learn common design patterns and architectural approaches.',
      topics: ['Module Pattern', 'Observer', 'Singleton', 'Factory'],
      href: '#patterns',
      level: 'advanced' as const,
    },
    {
      icon: Server,
      title: 'Node.js',
      description: 'Build server-side applications with Node.js runtime environment.',
      topics: ['NPM', 'File System', 'HTTP Server', 'Express'],
      href: '#nodejs',
      level: 'intermediate' as const,
    },
    {
      icon: Layout,
      title: 'Frameworks',
      description: 'Master popular JavaScript frameworks like React, Vue, and Angular.',
      topics: ['React', 'Vue', 'Angular', 'Svelte'],
      href: '#frameworks',
      level: 'intermediate' as const,
    },
    {
      icon: TestTube,
      title: 'Testing',
      description: 'Write reliable code with unit, integration, and end-to-end tests.',
      topics: ['Jest', 'Vitest', 'Testing Library', 'Cypress'],
      href: '#testing',
      level: 'intermediate' as const,
    },
    {
      icon: Gauge,
      title: 'Performance',
      description: 'Optimize JavaScript applications for speed and efficiency.',
      topics: ['Lazy Loading', 'Code Splitting', 'Memoization', 'Web Vitals'],
      href: '#performance',
      level: 'advanced' as const,
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Secure your applications against common vulnerabilities.',
      topics: ['XSS', 'CSRF', 'Auth', 'Validation'],
      href: '#security',
      level: 'advanced' as const,
    },
    {
      icon: Wrench,
      title: 'Tools & Ecosystem',
      description: 'Master the modern JavaScript development toolchain.',
      topics: ['Webpack', 'Vite', 'ESLint', 'TypeScript'],
      href: '#tools',
      level: 'intermediate' as const,
    },
  ];

  return (
    <Section id="roadmap" background="gradient">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Learning Roadmap
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A structured path to master JavaScript from fundamentals to expert level
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmapItems.map((item) => (
          <RoadmapCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
};
