const breakpoints = {
  tablet: 1024,
  mobile: 767,
}

export const mediaQuery = Object.keys(breakpoints).reduce((acc, key) => {
  acc[key] = (...args) => `
    @media (max-width: ${breakpoints[key]}px) {
      ${args}
    }
  `;
  return acc;
}, {});