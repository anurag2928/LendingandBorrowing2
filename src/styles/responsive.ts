import theme from './theme';

export const media = {
  xs: `@media (max-width: ${theme.breakpoints.xs})`,
  sm: `@media (max-width: ${theme.breakpoints.sm})`,
  md: `@media (max-width: ${theme.breakpoints.md})`,
  lg: `@media (max-width: ${theme.breakpoints.lg})`,
  xl: `@media (max-width: ${theme.breakpoints.xl})`,
  custom: (size: string) => `@media (max-width: ${size})`,
};

export const mobileOnly = `@media (max-width: ${theme.breakpoints.md})`;
export const tabletOnly = `@media (min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg})`;
export const desktopOnly = `@media (min-width: ${theme.breakpoints.lg})`;
export const desktopLargeOnly = `@media (min-width: ${theme.breakpoints.xl})`;

export const minWidth = {
  xs: `@media (min-width: ${theme.breakpoints.xs})`,
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
};
