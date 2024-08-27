module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  };
  