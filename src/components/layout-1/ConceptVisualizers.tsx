import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RotateCw, Layers, Lock } from 'lucide-react';

const concepts = [
  {
    id: 1,
    title: 'Event Loop',
    description: 'Understand how JavaScript handles asynchronous operations',
    icon: RotateCw,
    gradient: 'from-[#F7DF1E] to-yellow-600',
    steps: [
      'Call Stack processes synchronous code',
      'Web APIs handle async operations',
      'Callback Queue stores completed tasks',
      'Event Loop moves tasks to Call Stack',
    ],
  },
  {
    id: 2,
    title: 'Closures',
    description: 'Functions that remember their lexical scope',
    icon: Lock,
    gradient: 'from-purple-500 to-pink-500',
    steps: [
      'Function is defined in outer scope',
      'Inner function accesses outer variables',
      'Outer function returns inner function',
      'Closure maintains reference to scope',
    ],
  },
  {
    id: 3,
    title: 'Prototype Chain',
    description: 'How JavaScript objects inherit properties',
    icon: Layers,
    gradient: 'from-blue-500 to-cyan-500',
    steps: [
      'Object is created with prototype',
      'Property lookup starts at object',
      'Searches up the prototype chain',
      'Returns value or undefined',
    ],
  },
];

export function ConceptVisualizers() {
  const [activeStep, setActiveStep] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const nextStep = (conceptId: number, totalSteps: number) => {
    setActiveStep((prev) => ({
      ...prev,
      [conceptId]: (prev[conceptId] + 1) % totalSteps,
    }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Visual{' '}
            <span className="bg-gradient-to-r from-[#F7DF1E] to-yellow-600 bg-clip-text text-transparent">
              Concept Learning
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Interactive visualizations to understand complex JavaScript concepts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            const currentStep = activeStep[concept.id] || 0;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 border-2 border-gray-200 dark:border-slate-700 hover:border-[#F7DF1E] transition-all duration-300">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${concept.gradient} mb-4`}>
                    <Icon className="text-white" size={28} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {concept.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {concept.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Step {currentStep + 1} of {concept.steps.length}</span>
                      <div className="flex space-x-1">
                        {concept.steps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === currentStep ? 'bg-[#F7DF1E]' : 'bg-gray-300 dark:bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 min-h-[80px] flex items-center"
                      >
                        <p className="text-gray-900 dark:text-white font-medium">
                          {concept.steps[currentStep]}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => nextStep(concept.id, concept.steps.length)}
                    className={`w-full py-3 rounded-xl bg-gradient-to-r ${concept.gradient} text-white font-bold hover:shadow-lg transition-shadow`}
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
