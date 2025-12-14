/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^constants/(.*)$': '<rootDir>/src/constants/$1',
        '^infra/(.*)$': '<rootDir>/src/infra/$1',
        '^application/(.*)$': '<rootDir>/src/application/$1',
        '^@application/(.*)$': '<rootDir>/src/application/$1',
        '^@domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    },
};
