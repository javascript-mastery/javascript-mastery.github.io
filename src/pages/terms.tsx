import React, { JSX } from 'react';
import Layout from '@theme/Layout';

export default function Terms(): JSX.Element {
  return (
    <Layout title="Terms of Service" description="Terms of Service for JavaScript Mastery Hub">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 leading-relaxed">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20 mb-3">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Effective Date: September 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-300">
              By accessing and using JavaScript Mastery Hub (<code className="text-amber-600 dark:text-amber-400">https://javascript-mastery.github.io/</code>), you agree to comply with and be bound by these Terms of Service, all applicable laws, and regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">2. Intellectual Property & MIT License</h2>
            <p className="text-slate-600 dark:text-slate-300">
              All tutorial code snippets, starter repositories, and code samples provided on this website are distributed under the permissive MIT License unless explicitly stated otherwise. You are free to adapt, modify, and build commercial products using these code snippets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">3. Disclaimer of Warranties</h2>
            <p className="text-slate-600 dark:text-slate-300">
              The educational materials, interactive runners, and code samples are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, express or implied.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">4. Limitations of Liability</h2>
            <p className="text-slate-600 dark:text-slate-300">
              In no event shall JavaScript Mastery Hub, its maintainers, or open-source contributors be held liable for any damages or software failure arising out of the use or inability to use the guides or software provided on this site.
            </p>
          </section>

        </div>
      </main>
    </Layout>
  );
}