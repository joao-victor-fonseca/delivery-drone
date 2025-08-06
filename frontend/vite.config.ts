import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // se estiver usando React
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // <-- aqui está o importante
    },
  },
});
