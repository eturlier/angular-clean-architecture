import { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: {
        '^@core/(.*)$': '<rootDir>/src/core/app/$1',
        '^@ui-shared/(.*)$': '<rootDir>/src/ui/shared/$1',
        '^@utils/(.*)$': '<rootDir>/src/core/utils/$1',
    },
};

export default config;
