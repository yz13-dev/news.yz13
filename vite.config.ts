import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from 'vite';
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig(({ mode }) => {

  return {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true,
          v3_lazyRouteDiscovery: true,
        },
      }),
      tsconfigPaths(),
      {
        name: 'process-env-polyfill',
        transform(code) {
          return code.replace(/process\.env/g, 'import.meta.env');
        }
      },
      babel({
        filter: /\.[jt]sx?$/,
        babelConfig: {
          presets: ["@babel/preset-typescript"], // if you use TypeScript
          plugins: [["babel-plugin-react-compiler", { target: "19" }]],
        },
      }),
    ],
  }
});
