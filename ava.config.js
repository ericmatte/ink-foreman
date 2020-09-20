export default {
  babel: {
    compileEnhancements: false,
    testOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  files: ["./tests/*.test.ts(x)?"], // ["./specs/**/*.ts"],
  require: ["ts-node/register"], // , "@babel/register"],
  extensions: ["ts", "tsx"],
};
