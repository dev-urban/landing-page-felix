import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    strictPort: false,
    allowedHosts: ['*']
  },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4321,
    strictPort: false
  }
});