import React from "react";
import {
  Code2,
  Globe,
  Server,
  LayoutGrid as Layout,
  Wrench,
  TestTube,
  Gauge,
  Shield,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Section } from "../ui/Section";
import { motion } from "framer-motion";

export const EcosystemMap: React.FC = () => {
  const ecosystemCategories = [
    {
      icon: Code2,
      title: "Language Core",
      items: ["ES6+", "TypeScript", "Syntax", "Patterns"],
      color: "blue",
    },
    {
      icon: Globe,
      title: "Browser APIs",
      items: ["DOM", "Fetch", "Storage", "WebRTC"],
      color: "cyan",
    },
    {
      icon: Server,
      title: "Backend",
      items: ["Node.js", "Express", "APIs", "Database"],
      color: "green",
    },
    {
      icon: Layout,
      title: "Frameworks",
      items: ["React", "Vue", "Angular", "Svelte"],
      color: "orange",
    },
    {
      icon: Wrench,
      title: "Tooling",
      items: ["Webpack", "Vite", "Babel", "ESLint"],
      color: "red",
    },
    {
      icon: TestTube,
      title: "Testing",
      items: ["Jest", "Vitest", "Cypress", "Playwright"],
      color: "pink",
    },
    {
      icon: Gauge,
      title: "Performance",
      items: ["Optimization", "Lazy Load", "Caching", "Metrics"],
      color: "yellow",
    },
    {
      icon: Shield,
      title: "Security",
      items: ["XSS", "CSRF", "Auth", "Encryption"],
      color: "teal",
    },
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    cyan: "from-cyan-500 to-cyan-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    pink: "from-pink-500 to-pink-600",
    yellow: "from-yellow-500 to-yellow-600",
    teal: "from-teal-500 to-teal-600",
  };

  return (
    <Section background="dots">
      {/* <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          JavaScript Ecosystem
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore the vast landscape of JavaScript technologies and tools
        </p>
      </div> */}

      <header className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 text-balance"
          >
            Explore the <span className="text-[var(--ifm-color-primary)]">JS Ecosystem</span>
          </motion.h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            A visual directory of the technologies that power the modern web, 
            built for the open-source community.
          </p>
        </header>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ecosystemCategories.map((category) => (
          <Card
            key={category.title}
            hover
            glass
            className="p-5 border border-slate-200  transition-all duration-300"
          >
            {/* Header: Icon and Title aligned horizontally */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`shrink-0 inline-flex rounded-xl p-2.5 bg-gradient-to-br shadow-sm ${colorClasses[category.color as keyof typeof colorClasses]}`}
              >
                <category.icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg mt-4 font-bold text-gray-900 dark:text-white leading-tight">
                {category.title}
              </h3>
            </div>

            {/* Content: List with better spacing and subtle bullets */}
            <ul className="grid grid-cols-1 gap-2.5">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center text-sm font-medium text-slate-600 dark:text-zinc-400 group/item"
                >
                  {/* The bullet now highlights on hover of the card */}
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700 mr-3 transition-colors group-hover:bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
};
