import React, { JSX } from 'react';
import Layout from '@theme/Layout';

export default function About(): JSX.Element {
  const stats = [
    { label: 'Guides & Articles', value: '100+' },
    { label: 'Open Source Projects', value: '30+' },
    { label: 'Community Contributors', value: '200+' },
  ];

  return (
    <Layout title="About Us" description="Our Mission - JavaScript Mastery Hub">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Hero Banner */}
          <div className="text-center space-y-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
              Engineered for the Modern Developer
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              JavaScript Mastery Hub was built to bridge the gap between basic syntax tutorials and high-scale software engineering.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="text-4xl font-extrabold text-amber-500 mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xl">
                🚀
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We make modern web developer education accessible to everyone worldwide. We believe high-quality engineering guides should be community-driven and free forever.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xl">
                💻
              </div>
              <h3 className="text-2xl font-bold">Open Source Core</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our entire curriculum and platform are 100% open-source. Anyone can suggest fixes, write new tutorials, or enhance existing documentation via GitHub.
              </p>
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}