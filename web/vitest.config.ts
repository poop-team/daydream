import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  // TODO: Remove this cast once the stable upstream version fixes the type. Currently borked on 3.1.8
  plugins: [react() as any],
  test: {
    environment: "jsdom",
  },
});
