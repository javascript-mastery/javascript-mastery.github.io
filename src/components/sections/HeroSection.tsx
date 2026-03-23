import React from 'react';
import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <Container maxWidth="xl" className="relative py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Master JavaScript in 2024
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              JavaScript
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent py-4">
                Mastery Hub
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Your comprehensive guide to mastering JavaScript. From fundamentals to advanced patterns,
              dive deep into the language that powers the modern web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                Start Learning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Roadmap
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Examples</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">30+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-20"></div>
            <div className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex">
                  <span className="text-gray-500 mr-4">1</span>
                  <span className="text-blue-400">const</span>
                  <span className="text-white ml-2">masterJS</span>
                  <span className="text-white ml-2">=</span>
                  <span className="text-yellow-400 ml-2">async</span>
                  <span className="text-white ml-2">() =&gt; {'{'}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4">2</span>
                  <span className="text-blue-400 ml-4">const</span>
                  <span className="text-white ml-2">skills</span>
                  <span className="text-white ml-2">=</span>
                  <span className="text-yellow-400 ml-2">await</span>
                  <span className="text-cyan-400 ml-2">learn</span>
                  <span className="text-white">();</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4">3</span>
                  <span className="text-blue-400 ml-4">return</span>
                  <span className="text-white ml-2">skills.</span>
                  <span className="text-cyan-400">level</span>
                  <span className="text-white ml-2">===</span>
                  <span className="text-green-400 ml-2">'expert'</span>
                  <span className="text-white">;</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 mr-4">4</span>
                  <span className="text-white">{'}'}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2 text-green-400">
                <Code2 className="w-4 h-4" />
                <span className="text-sm">Ready to execute</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
