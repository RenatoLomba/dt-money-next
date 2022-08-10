export const defaultTheme = {
  colors: {
    white: '#fff',

    'gray-100': '#E1E1E6',
    'gray-300': '#C4C4CC',
    'gray-400': '#8D8D99',
    'gray-500': '#7C7C8A',
    'gray-600': '#323238',
    'gray-700': '#29292E',
    'gray-800': '#202024',
    'gray-900': '#121214',

    'green-300': '#00B37E',
    'green-500': '#00875F',
    'green-700': '#015F43',

    'red-300': '#F75A68',
    'red-500': '#AB222E',
    'red-700': '#7A1921',
  },
  fontSizes: {
    /** px: 14 */
    sm: '0.875rem',
    /** px: 16 */
    md: '1rem',
    /** px: 20 */
    lg: '1.25rem',
    /** px: 24 */
    xl: '1.5rem',
    /** px: 32 */
    '2xl': '2rem',
  },
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  fontFamilies: {
    roboto: `'Roboto', sans-serif`,
  },
} as const
