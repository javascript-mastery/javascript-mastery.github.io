import React, { JSX, useState } from 'react';
import Layout from '@theme/Layout';

export default function Contact(): JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Query', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout title="Contact Us" description="Get in touch with the JavaScript Mastery team">
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20">
              Get in Touch
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-amber-600 dark:from-white dark:via-slate-200 dark:to-amber-400 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Have a question, feedback, or open-source partnership idea? Drop us a message.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <div className="text-3xl">🎉</div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Message Sent Successfully</h3>
              <p className="text-slate-600 dark:text-slate-300">Thank you for reaching out! Our maintainers will respond shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-500 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900/60 p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Alex Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Topic</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                >
                  <option value="General Query">General Query</option>
                  <option value="Documentation Feedback">Documentation Feedback</option>
                  <option value="Open Source Collaboration">Open Source Collaboration</option>
                  <option value="Bug Report">Bug Report</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}

        </div>
      </main>
    </Layout>
  );
}