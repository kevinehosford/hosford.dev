export function getThemeValue(variable: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const styles = getComputedStyle(window.document.documentElement);
  const value = styles.getPropertyValue(variable);
  return value ? value : null;
}
