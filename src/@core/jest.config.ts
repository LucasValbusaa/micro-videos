export default {
  displayName: {
    name: "@core",
    color: "cyanBright",
  },
  clearMocks: true,
  coverageDirectory: "../__coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  rootDir: "src",
  testRegex: ".\\..*spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "@swc/jest",
  },
};
