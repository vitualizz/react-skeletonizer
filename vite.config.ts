import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: "./demo",
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "react-skeletonizer": path.resolve(__dirname, "./src"),
    },
  },
  base: "/react-skeletonizer/",
})
