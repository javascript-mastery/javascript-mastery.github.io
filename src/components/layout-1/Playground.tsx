import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

const defaultCode = `// Welcome to the JS Playground!
// Write your code here and click Run

function greet(name) {
  return \`Hello, \${name}! Welcome to The JS World.\`;
}

console.log(greet('Developer'));

// Try some calculations
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log('Sum:', sum);`;

export function Playground() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const executeCode = () => {
    setOutput('');
    const logs: string[] = [];

    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      logs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    console.error = (...args) => {
      logs.push('ERROR: ' + args.join(' '));
    };

    try {
      new Function(code)();
      setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('');
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Live{' '}
            <span className="bg-gradient-to-r from-[#F7DF1E] to-yellow-600 bg-clip-text text-transparent">
              Code Playground
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test your JavaScript skills in real-time with instant feedback
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Editor</h3>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyCode}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:border-[#F7DF1E] transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCode}
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 hover:border-[#F7DF1E] transition-colors"
                  title="Reset code"
                >
                  <RotateCcw size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={executeCode}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#F7DF1E] text-black font-bold hover:bg-yellow-500 transition-colors"
                >
                  <Play size={18} />
                  <span>Run</span>
                </motion.button>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-slate-900 flex items-center px-4 space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 pt-12 font-mono text-sm bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none resize-none"
                spellCheck={false}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Console Output</h3>
            <div className="relative rounded-xl overflow-hidden border-2 border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-slate-900 flex items-center px-4">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">console</span>
              </div>
              <pre className="w-full h-96 p-4 pt-12 font-mono text-sm bg-transparent text-gray-900 dark:text-gray-100 overflow-auto whitespace-pre-wrap">
                {output || 'Click "Run" to see output...'}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
