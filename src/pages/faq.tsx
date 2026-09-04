import React, { JSX, useState, useMemo } from 'react';
import Layout from '@theme/Layout';

interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Curriculum' | 'Open Source' | 'Licensing';
}

const faqData: FAQItem[] = [
  {
    category: 'General',
    question: 'What is JavaScript Mastery Hub?',
    answer: 'JavaScript Mastery Hub is an open-source educational ecosystem designed to provide developer-first, production-level JavaScript and TypeScript learning resources.'
  },
  {
    category: 'General',
    question: 'Are all tutorials and code examples free?',
    answer: 'Yes! 100% of our educational content, interactive code walkthroughs, and repository templates are completely free and open source.'
  },
  {
    category: 'Curriculum',
    question: 'What technologies are covered in the learning paths?',
    answer: 'We cover modern full-stack web engineering: JavaScript (ES2024+), TypeScript, React, Next.js, Node.js, Web APIs, testing with Vitest/Jest, and web performance optimization.'
  },
  {
    category: 'Open Source',
    question: 'How can I contribute to the site or documentation?',
    answer: 'You can jump directly into our GitHub repository, check open issues tagged "good first issue", or submit pull requests to fix bugs or add new guide sections.'
  },
  {
    category: 'Licensing',
    question: 'Can I use code snippets from this hub in commercial software?',
    answer: 'Yes. All snippet examples and starter templates offered on our platform are licensed under the permissive MIT License.'
  }
];

const categories = ['All', 'General', 'Curriculum', 'Open Source', 'Licensing'] as const;

export default function FAQ(): JSX.Element {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase()) ||
                            item.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <Layout title="FAQ" description="Frequently Asked Questions - JavaScript Mastery Hub">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              Help Center
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find instant answers to common questions about our platform, curriculum, and open-source contributions.
            </p>
          </div>

          {/* Controls: Search & Category Filter */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3.5 pl-12 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm transition-all"
              />
              <svg className="w-5 h-5 absolute left-4 top-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item, index) => {
                const isOpen = openIdx === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-slate-800/80 rounded-2xl bg-white dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : index)}
                      className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-lg text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="pr-4">{item.question}</span>
                      <span className={`transform transition-transform duration-300 text-amber-500 font-bold text-xl ${isOpen ? 'rotate-180' : ''}`}>
                        ↓
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 pt-4 leading-relaxed space-y-3">
                        <p>{item.answer}</p>
                        <span className="inline-block text-xs font-medium px-2.5 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full border border-amber-500/20">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 font-medium">No matching questions found.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </Layout>
  );
}