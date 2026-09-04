import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'Building Modern UI Architectures',
    description: 'Learn how to construct clean, scalable component structures with modern React patterns.',
    date: 'Sep 01, 2026',
    readTime: '5 min read',
    tags: ['React', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    author: { name: 'Ajay Dhangar', avatar: 'https://github.com/ajay-dhangar.png' },
  },
  // Add more posts here...
];

export default function BlogGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Latest Blog Posts
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Articles, guides, and tutorials on modern web engineering.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Card Banner Image */}
            {post.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            {/* Content Container */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex-1">
                {/* Category Tags */}
                <div className="flex items-center gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="text-xs">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {post.author.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {post.date} • {post.readTime}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}