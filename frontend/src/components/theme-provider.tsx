import * as React from "react";
import { createContext, useContext, useEffect, useEffectEvent } from "react";
import { useLocalStorage } from "usehooks-ts";

export const variants = [
  "default",
  "bubblegum",
  "doom64",
  "candyland",
  "notebook",
  "twitter",
  "claymorphism",
] as const;
export type Variant = (typeof variants)[number];

type VariantState = {
  variant: Variant;
  setVariant: (v: Variant) => void;
};

const initialVariantState: VariantState = {
  variant: "default",
  setVariant: () => null,
};

const VariantContext = createContext<VariantState>(initialVariantState);

export type Theme = "light" | "dark" | "system";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialThemeState: ThemeState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeContext = createContext<ThemeState>(initialThemeState);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultVariant?: Variant;
};
export function ThemeProvider({
  children,
  defaultVariant = "default",
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [variant, setVariant] = useLocalStorage<Variant>(
    "variant",
    defaultVariant,
  );
  const [theme, setTheme] = useLocalStorage<Theme>("theme", defaultTheme);

  const root = window.document.documentElement;

  const onVariantChange = useEffectEvent(() => {
    root.classList.remove(...variants);
    root.classList.add(variant);
  });

  useEffect(() => {
    onVariantChange();
  }, [variant]);

  const onThemeChange = useEffectEvent(() => {
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  });

  useEffect(() => {
    onThemeChange();
  }, [theme]);

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>
      {/* the fonts for all the variants. */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Fira+Code:wght@300..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oxanium:wght@200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap');
      </style>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </VariantContext.Provider>
  );
}

export const useVariant = () => {
  const context = useContext(VariantContext);

  if (context === undefined)
    throw new Error("useVariant must be used within a ThemeProvider");

  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
