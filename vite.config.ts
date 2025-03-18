import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@reduxjs/toolkit',
      'react-redux',
      'react-router-dom',
      'axios'
    ],
  },
  esbuild: {
    target: 'esnext'
  },
  server: {
    hmr: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false
  }
});
