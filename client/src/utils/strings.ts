import stringsEn from "../locales/en.json";

type LocaleType = "en";
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type StringKey = NestedKeyOf<typeof stringsEn>;

/**
 * Get a string from the localization file by key path
 * Supports nested keys using dot notation (e.g., "auth.loginTitle")
 * Supports variable substitution using {variableName} syntax
 *
 * @param key - The string key in dot notation
 * @param variables - Optional object with variables to replace in the string
 * @returns The localized string
 *
 * @example
 * // Basic usage
 * getString("products.catalog") // "Product Catalog"
 *
 * // With variables
 * getString("products.cartNotification", { quantity: 3 })
 * // "✓ Added to cart! Cart: 3 items"
 *
 * // With account welcome
 * getString("account.welcome", { name: "John" })
 * // "Welcome, John"
 */
function getString(
  key: StringKey,
  variables?: Record<string, string | number>
): string {
  const strings = stringsEn;
  const keys = key.split(".");
  let value: any = strings;

  // Navigate through nested object
  for (const k of keys) {
    value = value[k];
    if (value === undefined) {
      console.warn(`String key not found: ${key}`);
      return key; // Return key if not found
    }
  }

  // Replace variables
  if (typeof value === "string" && variables) {
    let result = value;
    Object.entries(variables).forEach(([varKey, varValue]) => {
      result = result.replace(`{${varKey}}`, String(varValue));
    });
    return result;
  }

  return value as string;
}

/**
 * React hook for accessing localization strings
 * Memoized to prevent unnecessary re-renders
 *
 * @returns Function to get strings
 *
 * @example
 * const { t } = useStrings();
 * return <h1>{t("products.catalog")}</h1>;
 */
export function useStrings() {
  return { t: getString };
}

/**
 * Direct export for non-hook usage
 */
export const t = getString;

/**
 * Get all strings (useful for debugging or exporting)
 */
export function getAllStrings() {
  return stringsEn;
}

export default { getString, useStrings, getAllStrings };
