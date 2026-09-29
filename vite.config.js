import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { apiApp } from './server/apiApp.js'

function apiServerPlugin() {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          apiApp(req, res, next);
        } else {
          next();
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiServerPlugin()],
})
