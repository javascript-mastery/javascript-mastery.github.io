import React, { useEffect, useState, useRef, useCallback } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Editor from "react-simple-code-editor";
import inspect from "object-inspect";
import { Prism, themes } from "prism-react-renderer";
import clsx from "clsx";
import { Copy, Check, Play, RotateCcw } from "lucide-react";

import normalizeTokens from "./normalizeTokens";
import themeToDict from "./themeToDict";
import styles from "../BrowserWindow/BrowserWindow.module.css";

const darkCodeTheme = themes.vsDark;
const themeDict = themeToDict(darkCodeTheme, "javascript");

if (ExecutionEnvironment.canUseDOM) {
  (typeof global !== "undefined" ? global : window).Prism = Prism;
}

interface Props {
  children: string;
  title?: string;
  run?: boolean;
}

export default function JSEditor({ children = "", title = "index.js" }: Props) {
  const [code, setCode] = useState(children.trim());
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Keep track of execution ID to prevent stale logs from previous runs
  const executionIdRef = useRef(0);

  const handleRun = useCallback(async () => {
    const currentExecutionId = ++executionIdRef.current;
    setOutputLines([]);
    setIsRunning(true);

    // Functional state update ensures logs are never lost or trapped in stale closures
    const mockLog = (...args: any[]) => {
      if (currentExecutionId !== executionIdRef.current) return;

      const formattedArgs = args
        .map((arg) => (typeof arg === "string" ? arg : inspect(arg, { depth: 4 })))
        .join(" ");

      setOutputLines((prev) => [...prev, formattedArgs]);
    };

    try {
      // 1. Transform console.log & console.error statements
      let transformedCode = code
        .replace(/console\.log\s*\(/g, "__log(")
        .replace(/console\.error\s*\(/g, "__log('❌ Error:', ");

      // 2. Track pending macrotasks (setTimeout / setInterval)
      const pendingTasks = new Set<Promise<void>>();

      const customSetTimeout = (cb: Function, delay?: number, ...args: any[]) => {
        if (currentExecutionId !== executionIdRef.current) return;

        let resolveTask: () => void;
        const taskPromise = new Promise<void>((res) => {
          resolveTask = res;
        });
        pendingTasks.add(taskPromise);

        return window.setTimeout(async () => {
          if (currentExecutionId !== executionIdRef.current) return;
          try {
            await cb(...args);
          } catch (err: any) {
            mockLog(`❌ Async Error: ${err.message}`);
          } finally {
            pendingTasks.delete(taskPromise);
            resolveTask();
          }
        }, delay);
      };

      const customSetInterval = (cb: Function, delay?: number, ...args: any[]) => {
        if (currentExecutionId !== executionIdRef.current) return;
        return window.setInterval(async () => {
          if (currentExecutionId !== executionIdRef.current) return;
          try {
            await cb(...args);
          } catch (err: any) {
            mockLog(`❌ Async Error: ${err.message}`);
          }
        }, delay);
      };

      // 3. Construct an AsyncFunction wrapper to allow top-level await and async calls
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      const execute = new AsyncFunction(
        "__log",
        "setTimeout",
        "setInterval",
        transformedCode
      );

      // Execute synchronous phase
      await execute(mockLog, customSetTimeout, customSetInterval);

      // 4. Wait for pending Promise microtasks to flush
      await new Promise((res) => setTimeout(res, 0));

      // 5. Wait for all tracked pending macrotasks (setTimeout callbacks) to complete
      while (pendingTasks.size > 0) {
        await Promise.all(Array.from(pendingTasks));
        // Flush microtasks queued during macrotask execution
        await new Promise((res) => setTimeout(res, 0));
      }
    } catch (err: any) {
      if (currentExecutionId === executionIdRef.current) {
        setOutputLines((prev) => [...prev, `❌ Runtime Error: ${err.message}`]);
      }
    } finally {
      if (currentExecutionId === executionIdRef.current) {
        setIsRunning(false);
      }
    }
  }, [code]);

  const handleReset = () => {
    executionIdRef.current++;
    setCode(children.trim());
    setOutputLines([]);
    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    handleRun();
  }, []);

  return (
    <div
      className={clsx(
        styles.browserWindow,
        "mb-10 overflow-hidden border-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl",
        "border-[var(--ifm-contents-border-color)]"
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          styles.browserWindowHeader,
          "flex items-center px-4 py-2 bg-[var(--ifm-color-emphasis-200)] gap-2"
        )}
      >
        {/* Left Section: Window Buttons */}
        <div className={clsx(styles.buttons, "flex items-center shrink-0")}>
          <span className={styles.dot} style={{ background: "#f25f58" }} />
          <span className={styles.dot} style={{ background: "#fbbe3c" }} />
          <span className={styles.dot} style={{ background: "#58cb42" }} />
        </div>

        {/* Center Section: Title Bar */}
        <div className="flex-1 flex justify-center px-4">
          <div
            className={clsx(
              styles.browserWindowAddressBar,
              "flex items-center gap-2 px-6 py-1 rounded-full bg-[var(--ifm-background-color)] border border-[var(--ifm-color-emphasis-300)] shadow-sm max-w-[400px] w-full justify-center transition-all duration-300"
            )}
          >
            <span
              className={clsx(
                "w-2 h-2 rounded-full shrink-0 transition-colors",
                isRunning ? "bg-amber-500 animate-ping" : "bg-blue-500"
              )}
            ></span>
            <span className="text-xs font-mono font-bold opacity-80 truncate tracking-wider">
              {title}
            </span>
          </div>
        </div>

        {/* Right Section: Copy Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-[var(--ifm-color-emphasis-300)] transition-all text-[var(--ifm-color-content)] clean-btn border border-transparent hover:border-[var(--ifm-color-emphasis-400)] active:scale-90 cursor-pointer"
            title="Copy Code"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="opacity-70" />
            )}
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col bg-[var(--ifm-background-surface-color)]">
        {/* Editor */}
        <div className="relative group">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(inputCode) => {
              const tokens = normalizeTokens(
                Prism.tokenize(inputCode, Prism.languages.javascript)
              );
              return tokens.map((line, i) => (
                <div key={i} className="flex">
                  <span className="flex-1">
                    {line.map((token, key) => (
                      <span
                        key={key}
                        style={themeDict ? themeDict[token.types[0]] : {}}
                      >
                        {token.content}
                      </span>
                    ))}
                  </span>
                </div>
              ));
            }}
            padding={20}
            className="font-mono text-sm min-h-[180px] outline-none"
            textareaClassName="outline-none focus:ring-0 caret-blue-400"
            style={{
              ...darkCodeTheme.plain,
              backgroundColor: "transparent",
            }}
          />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-[var(--ifm-color-emphasis-100)] border-y border-[var(--ifm-contents-border-color)]">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            JavaScript Runtime
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-md bg-transparent border border-[var(--ifm-color-emphasis-400)] hover:bg-[var(--ifm-color-emphasis-200)] transition-all border-none cursor-pointer"
              onClick={handleReset}
            >
              <RotateCcw size={12} /> Reset
            </button>
            <button
              type="button"
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-1 text-xs font-bold rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-95 border-none cursor-pointer disabled:opacity-50"
              onClick={handleRun}
            >
              <Play size={12} fill="white" /> {isRunning ? "Running..." : "Run"}
            </button>
          </div>
        </div>

        {/* Console Output Area */}
        <div className="flex flex-col">
          <div className="px-4 py-1 bg-[var(--ifm-color-emphasis-200)] text-[10px] font-bold text-[var(--ifm-color-content-secondary)] tracking-widest uppercase flex justify-between">
            <span>Console Output</span>
            {isRunning ? (
              <span className="text-amber-500 animate-pulse">Executing...</span>
            ) : outputLines.length > 0 ? (
              <span className="text-green-500">Done</span>
            ) : null}
          </div>
          <pre
            className={clsx(
              "m-0 p-4 font-mono text-sm min-h-[80px] overflow-x-auto whitespace-pre-wrap transition-colors",
              "bg-[var(--ifm-background-color)] text-[var(--ifm-color-content)]"
            )}
          >
            <BrowserOnly>
              {() =>
                outputLines.length > 0 ? (
                  outputLines.join("\n")
                ) : (
                  <span className="text-[var(--ifm-color-emphasis-600)] italic">
                    // Run the code to see results...
                  </span>
                )
              }
            </BrowserOnly>
          </pre>
        </div>
      </div>
    </div>
  );
}