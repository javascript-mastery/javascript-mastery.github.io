import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const floatingCodeSnippets = [
  "const learn = () => {}",
  "async/await",
  "function()",
  "{ ...spread }",
  "Promise.all()",
  "map() filter()",
];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-slate-950 dark:to-slate-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F7DF1E]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {floatingCodeSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute text-xs md:text-sm font-mono text-[var(--text-secondary)] opacity-20 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 5 + index,
            repeat: Infinity,
            delay: index * 0.5,
          }}
          style={{
            top: `${15 + index * 12}%`,
            left: `${10 + (index % 2) * 70}%`,
          }}
        >
          {snippet}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: -35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            className="inline-block"
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#F7DF1E] rounded-3xl blur-2xl opacity-50" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-[#F7DF1E] to-yellow-600 rounded-3xl flex items-center justify-center text-6xl font-bold text-black shadow-2xl">
                JS
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
            Master the{" "}
            <span className="text-[var(--ifm-color-primary)]">
              JS Universe
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From fundamentals to advanced concepts, dive deep into JavaScript's
            ecosystem with interactive learning experiences and real-world
            applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-[var(--ifm-color-primary)] text-white font-bold rounded-xl overflow-hidden shadow-xl hover:text-white/50"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Sparkles size={20} />
                <span>Start Learning</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-[var(--ifm-color-primary)/50] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-300 dark:border-slate-700 hover:border-[#F7DF1E] dark:hover:border-[#F7DF1E] transition-colors shadow-xl dark:hover:text-[var(--ifm-color-primary)]"
            >
              View Roadmap
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Topics", value: "50+" },
            { label: "Exercises", value: "200+" },
            { label: "Projects", value: "30+" },
            { label: "Students", value: "10K+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-4 rounded-xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-[#000] dark:border-slate-700"
            >
              <div className="text-3xl font-bold text-[var(--ifm-color-primary)] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
