/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'mantine-primary-color-contrast':
          'var(--mantine-primary-color-contrast)',

        'mantine-color-text': 'var(--mantine-color-text)',
        'mantine-color-bright': 'var(--mantine-color-bright)',
        'mantine-color-body': 'var(--mantine-color-body)',
        'mantine-color-error': 'var(--mantine-color-error)',
        'mantine-color-placeholder': 'var(--mantine-color-placeholder)',
        'mantine-color-anchor': 'var(--mantine-color-anchor)',

        'mantine-color-default': 'var(--mantine-color-default)',
        'mantine-color-default-hover': 'var(--mantine-color-default-hover)',
        'mantine-color-default-color': 'var(--mantine-color-default-color)',
        'mantine-color-default-border': 'var(--mantine-color-default-border)',

        'mantine-color-dimmed': 'var(--mantine-color-dimmed)',

        'mantine-color-dark-text': 'var(--mantine-color-dark-text)',
        'mantine-color-dark-filled': 'var(--mantine-color-dark-filled)',
        'mantine-color-dark-filled-hover':
          'var(--mantine-color-dark-filled-hover)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
