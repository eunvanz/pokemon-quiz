import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['macros', '@emotion/babel-plugin', [
        "module-resolver",
      {
        alias: {
          "~": "./src",
        },
      },
      ]]
    }
  }), tsconfigPaths()],
  define: {
    "process.env": process.env,
  },
});
