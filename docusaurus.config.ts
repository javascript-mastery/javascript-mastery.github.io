import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "JavaScript Mastery",
  tagline: "Master Modern JavaScript & Open Source Software Engineering",
  favicon: "img/js.svg",
  url: 'https://javascript-mastery.github.io',
  baseUrl: '/',
  organizationName: 'javascript-mastery',
  projectName: 'javascript-mastery.github.io',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "#",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "#",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'JS Mastery',
      logo: { alt: 'JS Mastery Logo', src: 'img/js.svg' },
      items: [
        { to: '/docs', label: 'Docs', position: 'left' },
        { to: "/tutorial", label: "Tutorial", position: "left" },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/faq', label: 'FAQ', position: 'left' },
        { to: '/about', label: 'About', position: 'left' },
        { to: '/contact', label: 'Contact', position: 'left' },
        {
          href: 'https://github.com/javascript-mastery',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Curriculum',
          items: [
            { label: 'JavaScript', to: '/docs' },
            { label: 'Tutorial', to: '/tutorial' },
            { label: 'Blog Articles', to: '/blog' },
          ],
        },
        {
          title: 'Company & Compliance',
          items: [
            { label: 'About Us', to: '/about' },
            { label: 'Contact Us', to: '/contact' },
            { label: 'FAQ', to: '/faq' },
            { label: 'Privacy Policy', to: '/privacy-policy' },
            { label: 'Terms of Service', to: '/terms' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/javascript-mastery' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} JavaScript Mastery. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "java",
        "latex",
        "haskell",
        "matlab",
        "PHp",
        "powershell",
        "bash",
        "diff",
        "json",
        "scss",
      ],
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],

  plugins: [
    "./src/plugins/tailwind-config.js",
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "tutorial",
        path: "tutorial",
        routeBasePath: "tutorial",
        // breadcrumbs: true,
        // editUrl: "#",
        sidebarPath: require.resolve("./sidebars.ts"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
};

export default config;
