module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    "^.+\\.(js|jsx)$": 'babel-jest', 
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Adiciona o arquivo de setup para TextDecoder/TextEncoder
};
