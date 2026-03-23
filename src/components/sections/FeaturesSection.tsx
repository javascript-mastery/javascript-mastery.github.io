import React from 'react';
import { Code, BookMarked, Play, Rocket } from 'lucide-react';
import { Card } from '../ui/Card';
import { Section } from '../ui/Section';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: BookMarked,
      title: 'Comprehensive Guides',
      description: 'In-depth documentation covering every aspect of JavaScript from basics to advanced topics.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Code,
      title: 'Interactive Examples',
      description: 'Hands-on code examples you can run and modify to better understand concepts.',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      icon: Play,
      title: 'Code Playground',
      description: 'Built-in editor to experiment with JavaScript code in real-time.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Rocket,
      title: 'Real-World Projects',
      description: 'Build practical applications to solidify your learning and portfolio.',
      gradient: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <Section background="default">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Us
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need to become a JavaScript expert in one place
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Card key={feature.title} hover className="p-6 text-center">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-4`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};
