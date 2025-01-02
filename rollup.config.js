import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { globby } from "globby";
import { rimraf } from "rimraf";
import autoExports from "rollup-plugin-auto-exports";
import materialSymbols from "rollup-plugin-material-symbols";
import terser from "@rollup/plugin-terser";

const input = await globby(["src/**/*.ts"]);

const cleanBuild = () => ({
  name: "clean",
  buildStart: async (dir) => {
    rimraf("./exports/**/*.js", { glob: true });
    rimraf("./exports/**/*.d.ts", { glob: true });
  },
});

export default [
  {
    input,
    output: [
      {
        dir: "exports",
        format: "es",
      },
    ],
    external: [
      "@vandeurenglenn/little-pubsub",
      "@vandeurenglenn/flex-elements",
      "@vandeurenglenn/lite",
    ],
    plugins: [
      cleanBuild(),
      typescript(),
      autoExports({
        defaultExports: {
          ".": {
            import: "./exports/elements.js",
            types: "./exports/elements.d.ts",
          },
        },
      }),
    ],
  },
  {
    input,
    output: {
      dir: "exports/bundle",
      format: "es",
    },
    plugins: [
      materialSymbols({
        placeholderPrefix: "symbol",
      }),
      nodeResolve(),
      typescript({
        compilerOptions: { declaration: false, outDir: "exports/bundle" },
      }),
      terser({
        keep_classnames: true,
      }),
    ],
  },
];
