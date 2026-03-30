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
  //soket통신하려니 해당 라이브러리는 global을 인지못함
  define: {
    global: 'window',
  },
})
