import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";
import { componentTagger } from "lovable-tagger";

const require = createRequire(import.meta.url);

// Resolve to the exact physical files to prevent duplicate React instances
const reactPath = require.resolve("react");
const reactDomPath = require.resolve("react-dom");
const reactDomClientPath = require.resolve("react-dom/client");
const jsxRuntimePath = require.resolve("react/jsx-runtime");
const jsxDevRuntimePath = require.resolve("react/jsx-dev-runtime");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  // Ensure optimizeDeps doesn't accidentally prebundle a second copy
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

      // Force a single physical React + ReactDOM instance (prevents Invalid Hook Call)
      react: reactPath,
      "react-dom": reactDomPath,
      "react-dom/client": reactDomClientPath,
      "react/jsx-runtime": jsxRuntimePath,
      "react/jsx-dev-runtime": jsxDevRuntimePath,
    },
    dedupe: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
}));
