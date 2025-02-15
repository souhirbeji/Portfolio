import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",  // Définit la base de l'application
  esbuild: {
    jsxInject: `import React from 'react'`,  // Évite les erreurs avec JSX
  }
})
