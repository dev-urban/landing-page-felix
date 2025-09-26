// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 4321,
    host: true
  },
  vite: {
    preview: {
      port: Number(process.env.PORT) || 8080,
      host: '0.0.0.0',
      strictPort: false,
      allowedHosts: ['*']
    }
  }
});
