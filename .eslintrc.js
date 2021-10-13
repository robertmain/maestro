module.exports = {
    root: true,
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'airbnb-base',
    ],
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-shadow': 'error',
        'no-shadow': 'off',
        'no-extra-semi': 'off',
        'no-unused-vars': 'off',
        semi: 'off',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        indent: ['error', 4],
        'arrow-parens': ['warn', 'always'],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'never',
            },
        ],
        'consistent-return': 'off',
        'func-names': ['warn', 'as-needed'],
        'id-length': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        'import/prefer-default-export': 'off',
        'max-len': [
            'error',
            {
                code: 80,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreUrls: true,
                ignoreRegExpLiterals: true,
                tabWidth: 2,
            },
        ],
        'max-params': [
            'warn',
            {
                max: 3,
            },
        ],
        'no-plusplus': [
            'warn',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-underscore-dangle': 'off',
        'prefer-arrow-callback': 0,
        'prefer-template': 'off',
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: true,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        radix: 'off',
        'class-methods-use-this': 'off',
        'import/extensions': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.ts'],
            },
        },
    },
    overrides: [
        {
            files: [
                'src/**/*.entity.ts',
            ],
            rules: {
                'import/no-cycle': 0,
            },
        },
    ],
};
