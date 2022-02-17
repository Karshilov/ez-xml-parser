import { defineConfig, searchForWorkspaceRoot } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: [
        ".."
      ],
    },
  },
});
