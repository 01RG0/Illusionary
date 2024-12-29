export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
} as const;

export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
} as const;

export const getBreakpoint = () => {
  if (typeof window === 'undefined') return 'mobile';
  
  const width = window.innerWidth;
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
};