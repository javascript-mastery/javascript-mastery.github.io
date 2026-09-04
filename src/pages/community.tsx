import React, { JSX } from 'react';
import Layout from '@theme/Layout';

export default function Community(): JSX.Element {
  const guidelines = [
    {
      title: 'Pick an Issue',
      desc: 'Explore open issues labeled "good first issue" or "documentation" on our GitHub repository.'
    },
    {
      title: 'Fork & Branch',
      desc: 'Create a topic branch from the main branch and apply clean, formatted code changes.'
    },
    {
      title: 'Submit Pull Request',
      desc: 'Open a PR detailing your enhancements. Our maintainers review every contribution within 48 hours.'
    }
  ];

  return (
    <Layout title="Community" description="Join the JavaScript Mastery Hub Open Source Community">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              Open Source
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
              Built by the Community, for the Community
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Collaborate with hundreds of developers worldwide to build the most comprehensive web engineering hub.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidelines.map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="p-10 rounded-3xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-center space-y-4 shadow-xl">
            <h2 className="text-3xl font-extrabold">Ready to make your first contribution?</h2>
            <p className="max-w-xl mx-auto text-slate-900 font-medium">
              Join our GitHub organization, improve existing guides, or help build new interactive tools.
            </p>
            <a
              href="https://github.com/javascript-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-slate-950 text-white font-bold rounded-xl hover:bg-slate-900 transition-all shadow-md"
            >
              View GitHub Repository
            </a>
          </div>

        </div>
      </main>
    </Layout>
  );
}