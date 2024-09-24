import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.mjs",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
      banner: "#!/usr/bin/env node",
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      banner: "#!/usr/bin/env node",
    },
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
      extensions: [".mjs", ".js", ".json", ".node"],
      moduleDirectories: ["node_modules"],
    }),
    commonjs(),
    json(),
  ],
  external: ["fs", "path", "child_process"],
};
