import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://akr6363.github.io/search-users-test',
  plugins: [react()],
})
