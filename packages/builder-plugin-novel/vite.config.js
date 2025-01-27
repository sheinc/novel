import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "./src/plugin.tsx"), // エントリーポイントを .tsx に変更
      external: [
        "@builder.io/react",
        "@builder.io/app-context",
        "@emotion/core",
        "react",
        "react-dom",
      ],
      output: {
        format: "system",
        entryFileNames: "plugin.system.js",
        dir: path.resolve(__dirname, "./public"), // 出力先ディレクトリ
      },
    },
  },

  plugins: [
    react({
      babel: {
        presets: [
          [
            "@babel/preset-react",
            {
              development: process.env.NODE_ENV === "development",
            },
          ],
        ],
      },
    }),
  ],

  server: {
    port: 1268,
    headers: {
      "Access-Control-Allow-Private-Network": "true",
      "Access-Control-Allow-Origin": "*",
    },
    fs: {
      allow: [path.resolve(__dirname, "./dist")],
    },
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
