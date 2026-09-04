import React, { JSX } from 'react';
import Layout from '@theme/Layout';

export default function PrivacyPolicy(): JSX.Element {
  return (
    <Layout title="Privacy Policy" description="Privacy Policy - JavaScript Mastery Hub">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900/50 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 leading-relaxed">
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: September 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">1. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-300">
              JavaScript Mastery Hub does not require user account registration to read our tutorials or explore our codebases.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">2. Cookies and Third-Party Advertising</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Third-party vendors, including Google AdSense, use cookies to serve ads based on a user's prior visits to our site or other web pages.
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-amber-500 underline font-semibold">Google Ad Settings</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400">3. Contact Information</h2>
            <p className="text-slate-600 dark:text-slate-300">
              For any questions regarding our policies, please submit an inquiry on our Contact page.
            </p>
          </section>

        </div>
      </main>
    </Layout>
  );
}