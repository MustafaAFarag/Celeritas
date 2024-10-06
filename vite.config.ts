import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Optional: to listen on all interfaces
    port: 3000, // Change this to your desired port
  },
});
