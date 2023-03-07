import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

module.exports = {
  input: "index.js",
  output: {
    dir: "dist",
  },
  treeshake:false,
  plugins: [
    copy({
      targets: [{ src: ["index.html","swish.mp3","dribble.mp3","mouse.png"], dest: "dist" }],
    }),
    nodeResolve(),
  ],
};