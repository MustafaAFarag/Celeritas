module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        text: 'var(--text)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'header-background': 'var(--header-background)',
        'product-background': 'var(--product-background)',
        'discount-background': 'var(--discount-background)',
        'rating-background': 'var(--rating-backgorund)',
        'nochange-text': 'var(--nochange-text)',
        'nochange-background': 'var(--nochange-background)',
        'sellers-background': 'var(--sellers-background)',
      },
    },
  },
  plugins: [],
};
