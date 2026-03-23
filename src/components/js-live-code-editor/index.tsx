import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Editor from "react-simple-code-editor";
import inspect from "object-inspect";
import { Prism, themes } from "prism-react-renderer";
import clsx from "clsx";

import normalizeTokens from "./normalizeTokens";
import themeToDict from "./themeToDict";
import styles from "../BrowserWindow/BrowserWindow.module.css"; // Your CSS file
import "./styles.scss"; // The editor specific styles

const darkCodeTheme = themes.vsDark;
const themeDict = themeToDict(darkCodeTheme, "javascript");

if (ExecutionEnvironment.canUseDOM) {
  (typeof global !== "undefined" ? global : window).Prism = Prism;
}

interface Props {
  children: string;
  title?: string;
  url?: string;
}

export default function JSEditor({
  children = "",
  title = "index.js",
}: Props) {
  const [code, setCode] = useState(children.trim());
  const [output, setOutput] = useState("");

  const handleRun = () => {
    const results: any[] = [];
    // Create a safe console.log mock
    const mockLog = (...args: any[]) => results.push(...args);
    
    try {
      // Use a function constructor to execute the code
      // We replace console.log in the string to use our mock
      const script = code.replace(/console\.log/g, "__log");
      const execute = new Function("__log", script);
      execute(mockLog);
      
      setOutput(results.map(line => inspect(line)).join("\n") || "undefined");
    } catch (err) {
      setOutput(inspect(err));
    }
  };

  const handleReset = () => {
    setCode(children.trim());
    setOutput("");
  };

  useEffect(() => {
    handleRun();
  }, []);

  return (
    <div className={styles.browserWindow}>
      {/* Header using your exact styles */}
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{ background: "#f25f58" }} />
          <span className={styles.dot} style={{ background: "#fbbe3c" }} />
          <span className={styles.dot} style={{ background: "#58cb42" }} />
        </div>
        <div className={clsx(styles.browserWindowAddressBar, "text--truncate")}>
          {title}
        </div>
        <div className={styles.browserWindowMenuIcon}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </div>

      <div className={clsx(styles.browserWindowBody, "js-live-editor-body")}>
        <div className="editor-wrapper">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => {
              const tokens = normalizeTokens(
                Prism.tokenize(code, Prism.languages.javascript, "javascript")
              );
              return tokens.map((line, i) => (
                <div key={i} className="editor-line py-1">
                  <span className="line-number">{i + 1}</span>
                  <span className="line-content">
                    {line.map((token, key) => (
                      <span key={key} style={themeDict ? themeDict[token.types[0]] : {}}>
                        {token.content}
                      </span>
                    ))}
                  </span>
                </div>
              ));
            }}
            padding={0}
            className="code-editor"
            textareaClassName="code-textarea"
            style={{
              ...darkCodeTheme.plain,
              fontFamily: 'monospace',
            }}
          />
        </div>

        <div className="editor-actions">
          <button className="button button--secondary button--sm" onClick={handleReset}>
            Reset
          </button>
          <button className="button button--primary button--sm" onClick={handleRun}>
            Run Code
          </button>
        </div>

        <div className="output-container">
          <div className="output-header">
            <h3>
              OUTPUT
            </h3>
          </div>
          <pre className="output-content">
            <BrowserOnly>{() => output || "/* click run to see output */"}</BrowserOnly>
          </pre>
        </div>
      </div>
    </div>
  );
}