export default {
  ...require("../jest.config").default,
  displayName: {
    name: "nestjs-e2e",
    color: "yellow",
  },
  rootDir: "./",
  testRegex: ".*\\.e2e-spec\\.ts$",
  maxWorkers: 1,
};
