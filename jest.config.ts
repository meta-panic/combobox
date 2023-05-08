module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|svg)$": "<rootDir>/node_modules/jest-css-modules-transform"
  }
};
