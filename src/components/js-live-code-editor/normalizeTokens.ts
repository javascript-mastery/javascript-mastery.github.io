import type { Token as PrismToken } from "prismjs";

/**
 * Internal Token structure used by the JSEditor component.
 */
export type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

const newlineRe = /\r\n|\r|\n/;

/**
 * Ensures that empty lines are rendered with a newline character 
 * so the editor maintains its height and structure.
 */
const normalizeEmptyLines = (line: Token[]) => {
  if (line.length === 0) {
    line.push({
      types: ["plain"],
      content: "\n",
      empty: true,
    });
  } else if (line.length === 1 && line[0].content === "") {
    line[0].content = "\n";
    line[0].empty = true;
  }
};

/**
 * Appends token types while preventing duplicates in the hierarchy.
 */
const appendTypes = (types: string[], add: string[] | string): string[] => {
  const newTypes = Array.isArray(add) ? add : [add];
  // Filter out types already present in the stack to keep the DOM clean
  const uniqueNewTypes = newTypes.filter(type => !types.includes(type));
  return types.concat(uniqueNewTypes);
};

/**
 * Converts Prism's flat/nested token stream into a 2D array (lines -> tokens).
 * Uses an iterative stack-based approach to handle deep nesting without 
 * causing stack overflow errors on large code blocks.
 */
const normalizeTokens = (tokens: (PrismToken | string)[]): Token[][] => {
  const typeArrStack: string[][] = [[]];
  const tokenArrStack: (PrismToken | string | (PrismToken | string)[])[] = [tokens];
  const tokenArrIndexStack = [0];
  const tokenArrSizeStack = [tokens.length];
  
  let stackIndex = 0;
  let currentLine: Token[] = [];
  const acc: Token[][] = [currentLine];

  while (stackIndex > -1) {
    while (tokenArrIndexStack[stackIndex] < tokenArrSizeStack[stackIndex]) {
      const i = tokenArrIndexStack[stackIndex]++;
      const tokenArr = tokenArrStack[stackIndex] as (PrismToken | string)[];
      const token = tokenArr[i];

      let content: string | (PrismToken | string)[];
      let types = typeArrStack[stackIndex];

      // Handle String vs Prism Token
      if (typeof token === "string") {
        types = stackIndex > 0 ? types : ["plain"];
        content = token;
      } else {
        types = appendTypes(types, token.type);
        if (token.alias) {
          types = appendTypes(types, token.alias);
        }
        content = token.content;
      }

      // Recursive Case: If content is an array, push to stack
      if (Array.isArray(content)) {
        stackIndex++;
        typeArrStack.push(types);
        tokenArrStack.push(content);
        tokenArrIndexStack.push(0);
        tokenArrSizeStack.push(content.length);
        continue;
      }

      // Base Case: Content is a string, split by newlines
      const splitByNewlines = content.split(newlineRe);
      const newlineCount = splitByNewlines.length;

      // First segment belongs to the current line
      if (splitByNewlines[0] !== "" || stackIndex > 0 || i > 0) {
        currentLine.push({
          types,
          content: splitByNewlines[0],
        });
      }

      // Subsequent segments create new lines
      for (let j = 1; j < newlineCount; j++) {
        normalizeEmptyLines(currentLine);
        currentLine = [];
        acc.push(currentLine);
        currentLine.push({
          types,
          content: splitByNewlines[j],
        });
      }
    }

    // Finished processing current array, pop the stack
    stackIndex--;
    typeArrStack.pop();
    tokenArrStack.pop();
    tokenArrIndexStack.pop();
    tokenArrSizeStack.pop();
  }

  normalizeEmptyLines(currentLine);
  return acc;
};

export default normalizeTokens;