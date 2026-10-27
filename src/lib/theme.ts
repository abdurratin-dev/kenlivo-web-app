/**
 * Global color palette derived from the Kenlivo brand — rose/mauve beauty theme.
 * Use these tokens everywhere instead of raw hex values.
 */
export const colors = {
  brand: {
    50:  '#fff8f6',
    100: '#fce8e6',
    200: '#f4dedb',
    300: '#f3d5d8',
    400: '#f2bdba',
    500: '#c96778',
    600: '#B95770',
    700: '#a84759',
    800: '#713944',
    900: '#492a30',
    950: '#512d35',
  },
  muted: {
    50:  '#fffdfc',
    100: '#fff5f3',
    200: '#f9e5e1',
    300: '#ead8d7',
    400: '#c2aaab',
    500: '#b69a9c',
    600: '#b77b83',
    700: '#987b7e',
    800: '#65454b',
    900: '#a78b8d',
  },
  text: {
    primary: '#171717',
    dark:    '#492a30',
    medium:  '#65454b',
    muted:   '#987b7e',
    light:   '#a78b8d',
    link:    '#b94f64',
  },
  border: {
    light:   '#f4dedb',
    DEFAULT: '#ead8d7',
    focus:   '#c66f7d',
  },
  bg: {
    page:  '#fff8f6',
    card:  '#ffffff',
    input: '#fffdfc',
    hover: '#fff5f3',
    icon:  '#fce8e6',
  },
  status: {
    pending:    { bg: '#fef9c3', text: '#854d0e' },
    paid:       { bg: '#dcfce7', text: '#166534' },
    processing: { bg: '#dbeafe', text: '#1e40af' },
    shipped:    { bg: '#e0e7ff', text: '#3730a3' },
    delivered:  { bg: '#d1fae5', text: '#065f46' },
    cancelled:  { bg: '#fee2e2', text: '#991b1b' },
  },
  danger: {
    light: '#ff6b6b',
    DEFAULT: '#ff5252',
    bg: '#fee2e2',
    text: '#991b1b',
  },
} as const;

export type Colors = typeof colors;
