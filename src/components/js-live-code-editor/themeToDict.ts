import { type Language, type PrismTheme } from "prism-react-renderer";

/**
 * Enhanced ThemeDict to support standard Prism token types 
 * and custom object styles.
 */
type ThemeDict = {
  root: React.CSSProperties;
  plain: React.CSSProperties;
  [type: string]: React.CSSProperties;
};

/**
 * Converts a Prism theme object into a flat dictionary for faster lookup 
 * during the render cycle of the JSEditor.
 */
const themeToDict = (theme: PrismTheme, language: Language): ThemeDict => {
  const { plain, styles } = theme;

  // Initialize the accumulator with required base properties
  const initialDict: ThemeDict = {
    root: plain as React.CSSProperties,
    plain: { ...plain, backgroundColor: "transparent" } as React.CSSProperties,
  };

  const themeDict = styles.reduce<ThemeDict>((acc, themeEntry) => {
    const { languages, style, types } = themeEntry;

    // If the style is language-specific and doesn't match, skip it
    if (languages && !languages.includes(language)) {
      return acc;
    }

    types.forEach((type) => {
      // Merge existing styles for this type with the new style entry
      acc[type] = { 
        ...(acc[type] || {}), 
        ...(style as React.CSSProperties) 
      };
    });

    return acc;
  }, initialDict);

  return themeDict;
};

export default themeToDict;