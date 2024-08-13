import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://portfolio-hub-backend.vercel.app',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       agent: new http.Agent()
  //     }
    
  //   }
  },
  plugins: [react()],
})
