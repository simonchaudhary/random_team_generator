// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   moduleDirectories: ['node_modules', 'src'],
//   moduleNameMapper: {
//     '^$/': '<rootDir>/src/'
//   },
//   maxWorkers: 5,
//   transform: {
//     // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
//     // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
//     '^.+\\.tsx?$': [
//       'ts-jest',
//       {
//         compiler: 'typescript',
//         tsconfig: 'tsconfig.json'
//         // ts-jest configuration goes here
//       }
//     ]
//   }
// };

export default {
  transform: {},
  extensionsToTreatAsEsm: ['.ts']
};
