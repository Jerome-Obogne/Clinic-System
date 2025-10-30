import { defineConfig } from "vitest/config"; // ✅ Fixes the overload issue
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components/ui": path.resolve(__dirname, "src/components/ui"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
