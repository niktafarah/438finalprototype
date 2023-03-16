import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "firebase.js",
  output: {
    dir: "dist",
  },
  treeshake:false,
  plugins: [
    copy({
      targets: [{ src: ["index.js", "style.css", "mouse.png"], dest: "dist" }],
    }),
    nodeResolve(),
  ],
};