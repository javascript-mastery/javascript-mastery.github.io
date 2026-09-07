import React, { useState, useEffect, useRef } from "react";

// 1. Define strict type interfaces for the component properties
export interface EditorTemplates {
  initialHtml: string;
  initialCss: string;
  initialJs: string;
}

export interface LiveCodeEditorProps {
  lessonTitle: string;
  lessonSubtitle?: string;
  templates: EditorTemplates;
}

interface ConsoleMessage {
  type: "LOG" | "ERROR";
  text: string;
  id: string;
}

export const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  lessonTitle,
  lessonSubtitle,
  templates,
}) => {
  // 2. Manage sandbox panel input states independently
  const [htmlCode, setHtmlCode] = useState<string>(templates.initialHtml);
  const [cssCode, setCssCode] = useState<string>(templates.initialCss);
  const [jsCode, setJsCode] = useState<string>(templates.initialJs);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleMessage[]>([]);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset states cleanly if templates prop changes down the tree
  useEffect(() => {
    setHtmlCode(templates.initialHtml);
    setCssCode(templates.initialCss);
    setJsCode(templates.initialJs);
    setConsoleLogs([]);
  }, [templates]);

  // 3. Listen for postMessage telemetry fired by the inner iframe sandboxed runtime
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === "CONSOLE_LOG" || event.data.type === "CONSOLE_ERROR")) {
        const uniqueId = `${Date.now()}-${Math.random()}`;
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: event.data.type === "CONSOLE_ERROR" ? "ERROR" : "LOG",
            text: event.data.message,
            id: uniqueId,
          },
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // 4. Hot reload code bundling system triggered by input changes
  useEffect(() => {
    setConsoleLogs([]); // Flush logs on fresh state compilation cycles

    const completeSource = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 80vh; }
          ${cssCode}
        </style>
        <script>
          const _log = console.log;
          console.log = function(...args) {
            _log.apply(console, args);
            window.parent.postMessage({ type: 'CONSOLE_LOG', message: args.join(' ') }, '*');
          };
          window.onerror = function(message) {
            window.parent.postMessage({ type: 'CONSOLE_ERROR', message: 'Error: ' + message }, '*');
          };
        </script>
      </head>
      <body>
        ${htmlCode}
        <script>
          try {
            ${jsCode}
          } catch(err) {
            window.parent.postMessage({ type: 'CONSOLE_ERROR', message: 'Runtime Error: ' + err.message }, '*');
          }
        </script>
      </body>
      </html>
    `;

    const blob = new Blob([completeSource], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);

    if (iframeRef.current) {
      iframeRef.current.src = blobUrl;
    }

    // Clean up memory space
    return () => URL.revokeObjectURL(blobUrl);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div style={styles.container}>
      {/* <header style={styles.header}>
        <h1 style={styles.title}>{lessonTitle}</h1>
        {lessonSubtitle && <p style={styles.subtitle}>{lessonSubtitle}</p>}
      </header> */}

      <main style={styles.workspace}>
        {/* INPUT PANEL: EDITORS */}
        <section style={styles.pane}>
          <div style={styles.editorBox}>
            <label style={styles.label}>HTML (Body)</label>
            <textarea
              style={styles.textarea}
              spellCheck={false}
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
            />
          </div>

          <div style={styles.editorBox}>
            <label style={styles.label}>CSS</label>
            <textarea
              style={styles.textarea}
              spellCheck={false}
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
            />
          </div>

          <div style={styles.editorBox}>
            <label style={styles.label}>JavaScript</label>
            <textarea
              style={styles.textarea}
              spellCheck={false}
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
            />
          </div>
        </section>

        {/* OUTPUT PANEL: PREVIEW & TELEMETRY TERMINAL */}
        <section style={styles.pane}>
          <div style={{ ...styles.panel, flexGrow: 2 }}>
            <h2 style={styles.panelTitle}>Live Preview</h2>
            <iframe
              ref={iframeRef}
              title="Live Render Stage"
              style={styles.iframe}
              sandbox="allow-scripts"
            />
          </div>

          <div style={{ ...styles.panel, flexGrow: 1 }}>
            <h2 style={styles.panelTitle}>Virtual Console</h2>
            <div style={styles.consoleStage}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: "50px" }}>
                {consoleLogs.map((log) => (
                  <li
                    key={log.id}
                    style={{
                      ...styles.consoleItem,
                      color: log.type === "ERROR" ? "#f87171" : "#4ade80",
                      borderLeftColor: log.type === "ERROR" ? "#f87171" : "#38bdf8",
                    }}
                  >
                    {log.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Inline Type-Safe Stylesheet to keep the component fully modular and self-contained
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    width: "100%",
    // backgroundColor: "#0f172a",
    color: "#f8fafc",
    // padding: "1.5rem",
    fontFamily: "system-ui, sans-serif",
    boxSizing: "border-box",
  },
  header: { marginBottom: "1rem" },
  title: { color: "#38bdf8", fontSize: "1.5rem", margin: 0, textAlign: "center" },
  subtitle: { color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.25rem", textAlign: "center" },
  workspace: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    flexGrow: 1,
    minHeight: 0,
  },
  pane: { display: "flex", flexDirection: "column", gap: "1rem", minHeight: 0 },
  editorBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    overflow: "hidden",
  },
  label: {
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#38bdf8",
    background: "rgba(0,0,0,0.2)",
    padding: "0.4rem 0.8rem",
    borderBottom: "1px solid #334155",
  },
  textarea: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: "transparent",
    border: "none",
    color: "#e2e8f0",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    padding: "0.75rem",
    resize: "none",
    outline: "none",
  },
  panel: {
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "6px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  panelTitle: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    color: "#94a3b8",
    background: "rgba(0,0,0,0.2)",
    padding: "0.4rem 0.8rem",
    borderBottom: "1px solid #334155",
    margin: 0,
  },
  iframe: { width: "100%", height: "100%", border: "none", backgroundColor: "white" },
  consoleStage: {
    backgroundColor: "#020617",
    fontFamily: "monospace",
    fontSize: "0.85rem",
    padding: "0.75rem",
    overflowY: "auto",
    flexGrow: 1,
  },
  consoleItem: {
    marginBottom: "0.4rem",
    borderLeft: "3px solid",
    paddingLeft: "0.5rem",
  },
};
