module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: '#f5f5f5',
        text: '#333333',
        primary: '#1a73e8',
        secondary: '#fbbc05',
        'header-background': '#ebebeb', // Light mode Header background

        // Dark mode colors
        'dark-background': '#181818',
        'dark-text': '#e0e0e0',
        'dark-primary': '#1a73e8',
        'dark-secondary': '#fbbc05',
        'dark-header-background': '#1f1f1f', // Dark mode Header background
      },
    },
  },
  plugins: [],
};
