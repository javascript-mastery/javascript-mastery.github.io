import React, { useState, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import { Play, RotateCcw, Terminal, Sparkles, Zap, Command, Copy, Check } from 'lucide-react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import clsx from 'clsx';

const DEFAULT_CODE = `// ⚡ Mastery Hub: Quick Logic Test
const challenge = {
  topic: "Closures",
  difficulty: "Expert",
  status: "Learning"
};

function unlockMastery(obj) {
  return \`Status: \${obj.status} Mastery...\`;
}

console.log(unlockMastery(challenge));`;

export const LiveSnippetPreview = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsExecuting(true);
    setOutput('');
    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => logs.push(args.map(a => 
        typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '))
    };

    try {
      const runCode = new Function('console', code);
      runCode(customConsole);
      setTimeout(() => {
        setOutput(logs.join('\n') || '// Output: Success (No logs)');
        setIsExecuting(false);
      }, 400); // Artificial delay for UX "feel"
    } catch (err: any) {
      setOutput(`❌ Error: ${err.message}`);
      setIsExecuting(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--bg-surface)]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)] opacity-10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Header with Badge */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent-dark)] text-xs font-bold uppercase tracking-widest mb-4">
            <Zap size={14} className="fill-current" />
            Interactive Playground
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-center tracking-tighter">
            Test your logic in the <span className="text-[var(--ifm-color-primary)]">browser runtime</span>
          </h2>
        </div>

        {/* Main Editor UI */}
        <div className="relative group">
          {/* Decorative Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--ifm-color-primary)] to-[var(--accent)] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative flex flex-col lg:flex-row rounded-[1.8rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0b0e14]">
            
            {/* Left Column: Editor */}
            <div className="flex-1 flex flex-col border-r border-white/5">
              <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-4">
                   <button onClick={copyCode} className="text-slate-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                   </button>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">javascript</span>
                </div>
              </div>

              <div className="flex-grow relative bg-transparent scrollbar-hide">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                  padding={28}
                  className="font-mono text-sm sm:text-base leading-relaxed text-slate-300"
                  textareaClassName="outline-none focus:ring-0 caret-[var(--accent)]"
                  style={{ fontFamily: '"Fira Code", monospace' }}
                />
              </div>

              <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex justify-between items-center">
                <button onClick={() => setCode(DEFAULT_CODE)} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white bg-transparent border-none cursor-pointer transition-colors">
                  <RotateCcw size={14} /> Reset
                </button>
                <button 
                  onClick={handleRun}
                  disabled={isExecuting}
                  className="flex items-center gap-2 px-8 py-3 bg-[var(--accent)] text-black rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(247,223,30,0.3)] border-none cursor-pointer"
                >
                  {isExecuting ? <RotateCcw size={16} className="animate-spin" /> : <Play size={16} className="fill-current" />}
                  {isExecuting ? 'EXECUTING...' : 'RUN CODE'}
                </button>
              </div>
            </div>

            {/* Right Column: Console */}
            <div className="lg:w-[35%] flex flex-col bg-black/40 backdrop-blur-xl">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 text-[var(--accent)] font-black text-xs uppercase tracking-tighter">
                <Terminal size={16} /> Console Output
              </div>
              
              <div className="p-6 font-mono text-sm h-full min-h-[150px]">
                <BrowserOnly>
                  {() => (
                    <div className={clsx(
                      "transition-all duration-500",
                      isExecuting ? "opacity-30 blur-sm" : "opacity-100 blur-0"
                    )}>
                      {output ? (
                        <div className={clsx(
                          "p-4 rounded-lg border",
                          output.includes('Error') ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        )}>
                          {output}
                        </div>
                      ) : (
                        <div className="text-slate-600 flex flex-col items-center justify-center pt-10 opacity-40">
                          <Command size={32} className="mb-2" />
                          <p className="text-[10px] uppercase font-bold tracking-widest text-center">Waiting for command...</p>
                        </div>
                      )}
                    </div>
                  )}
                </BrowserOnly>
              </div>

              <div className="mt-auto px-6 py-4 text-[10px] text-slate-700 font-bold uppercase flex justify-between border-t border-white/5">
                <span>Memory: 0.4ms</span>
                <span>Node v20.x</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};