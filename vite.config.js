import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 현재 경로의 src를 'src'라는 이름으로 매핑
      "src": path.resolve(__dirname, "./src"),
    },
  },
})
