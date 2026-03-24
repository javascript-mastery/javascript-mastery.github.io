import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Editor from "react-simple-code-editor";
import inspect from "object-inspect";
import { Prism, themes } from "prism-react-renderer";
import clsx from "clsx";
import { Copy, Check, Play, RotateCcw } from "lucide-react"; // Install lucide-react or use SVGs

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
}

export default function JSEditor({ children = "", title = "index.js" }: Props) {
  const [code, setCode] = useState(children.trim());
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    const results: any[] = [];
    const mockLog = (...args: any[]) => results.push(...args);

    try {
      const script = code.replace(/console\.log\s*\(/g, "__log(");
      const execute = new Function("__log", script);
      execute(mockLog);
      setOutput(results.map((line) => inspect(line)).join("\n") || "undefined");
    } catch (err: any) {
      setOutput(`❌ Error: ${err.message}`);
    }
  };

  const handleReset = () => {
    setCode(children.trim());
    setOutput("");
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
        "border-[var(--ifm-contents-border-color)]",
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          styles.browserWindowHeader,
          "flex items-center px-4 py-2 bg-[var(--ifm-color-emphasis-200)] gap-2",
        )}
      >
        {/* 1. Left Section: Buttons (Fixed Width) */}
        <div className={clsx(styles.buttons, "flex items-center shrink-0")}>
          <span className={styles.dot} style={{ background: "#f25f58" }} />
          <span className={styles.dot} style={{ background: "#fbbe3c" }} />
          <span className={styles.dot} style={{ background: "#58cb42" }} />
        </div>

        {/* 2. Center Section: Address Bar (Flexible & Centered) */}
        <div className="flex-1 flex justify-center px-4">
          <div
            className={clsx(
              styles.browserWindowAddressBar,
              "flex items-center gap-2 px-6 py-1 rounded-full bg-[var(--ifm-background-color)] border border-[var(--ifm-color-emphasis-300)] shadow-sm max-w-[400px] w-full justify-center transition-all duration-300",
            )}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
            <span className="text-xs font-mono font-bold opacity-80 truncate tracking-wider">
              {title}
            </span>
          </div>
        </div>

        {/* 3. Right Section: Action Buttons (Fixed Width) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-[var(--ifm-color-emphasis-300)] transition-all text-[var(--ifm-color-content)] clean-btn border border-transparent hover:border-[var(--ifm-color-emphasis-400)] active:scale-90"
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
        {/* Editor Wrapper */}
        <div className="relative group">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => {
              const tokens = normalizeTokens(
                Prism.tokenize(code, Prism.languages.javascript),
              );
              return tokens.map((line, i) => (
                <div key={i} className="flex">
                  {/* 
                  <span className="inline-block text-right mr-1 select-none text-gray-500 font-mono text-[14px] pt-1">
                    {i + 1}.
                  </span>
                 */}
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
            textareaClassName="pl-14 pt-5 outline-none focus:ring-0 caret-blue-400"
            style={{
              ...darkCodeTheme.plain,
              backgroundColor: "transparent",
            }}
          />
        </div>

        {/* Improved Action Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-[var(--ifm-color-emphasis-100)] border-y border-[var(--ifm-contents-border-color)]">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            JavaScript Runtime
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-md bg-transparent border border-[var(--ifm-color-emphasis-400)] hover:bg-[var(--ifm-color-emphasis-200)] transition-all border-none"
              onClick={handleReset}
            >
              <RotateCcw size={12} /> Reset
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-1 text-xs font-bold rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-95 border-none"
              onClick={handleRun}
            >
              <Play size={12} fill="white" /> Run
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="flex flex-col">
          <div className="px-4 py-1 bg-[var(--ifm-color-emphasis-200)] text-[10px] font-bold text-[var(--ifm-color-content-secondary)] tracking-widest uppercase flex justify-between">
            <span>Console Output</span>
            {output && <span className="text-green-500">Done</span>}
          </div>
          <pre
            className={clsx(
              "m-0 p-4 font-mono text-sm min-h-[80px] overflow-x-auto whitespace-pre-wrap transition-colors",
              "bg-[var(--ifm-background-color)] text-[var(--ifm-color-content)]",
            )}
          >
            <BrowserOnly>
              {() =>
                output || (
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
