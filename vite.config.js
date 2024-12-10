import { defineConfig } from "vite";
export default defineConfig({
    esbuild: {
        jsxFactory: "createElement",
        jsxFragment: "createFragment",
        jsxInject: `import { createElement, createFragment } from "/src/runtime/jsx-runtime.js"`,
    },
});
