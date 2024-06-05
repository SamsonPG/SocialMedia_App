import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 7000,
    //get rid of the CORS eror
    proxy:{
      "/api":{
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
