import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { readFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: readFileSync(resolve(__dirname, process.env.SSL_KEY_FILE || "")),
      cert: readFileSync(resolve(__dirname, process.env.SSL_CERT_FILE || "")),
    },
    port: 3000,
    strictPort: true,
  },
});
