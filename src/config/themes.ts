/**
 * COLOUR THEMES
 * -------------
 * Four premium colour combinations. The CSS variables for each live in
 * src/index.css ([data-theme='…'] blocks); the hex values here are used by the
 * 3D scene and the theme switcher swatches. Keep the two in sync.
 *
 * Choose the default theme and whether visitors can switch in
 * src/config/siteConfig.ts → `theme`.
 */
export type ThemeId = 'volt' | 'inferno' | 'gold' | 'ice';

export interface Theme {
  id: ThemeId;
  name: string;
  /** Primary accent */
  accent: string;
  /** Secondary accent (gradients, 3D rim light) */
  accent2: string;
}

export const themes: Theme[] = [
  { id: 'volt', name: 'Volt Lime', accent: '#C6FF00', accent2: '#00FFA3' },
  { id: 'inferno', name: 'Inferno', accent: '#FF6A00', accent2: '#FF2D55' },
  { id: 'gold', name: 'Champion Gold', accent: '#FFC83C', accent2: '#FF8A00' },
  { id: 'ice', name: 'Ice Blue', accent: '#00E5FF', accent2: '#7C5CFF' },
];

export const getTheme = (id: string | null | undefined): Theme =>
  themes.find((t) => t.id === id) ?? themes[0];
