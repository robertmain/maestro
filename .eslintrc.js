module.exports = {
    'parser':  '@typescript-eslint/parser',  // Specifies the ESLint parser
    'extends': [
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true,
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'semi': ['error', 'always'],
        'quotes': [1, 'single'],
        'comma-dangle': ['warn', 'always-multiline'],
        'indent': ['error', 4],
        'prefer-arrow-callback': ['warn'],
        'no-throw-literal': ['error'],
        'arrow-parens': ['warn', 'always'],
        'max-len': ['warn', {
            code: 80,
            ignoreComments: true,
            ignoreUrls: true,
        }],
        'prefer-const': ['error'],
        'no-var': ['error'],
        'prefer-template': ['warn'],
        'prefer-destructuring': ['warn'],
        'object-curly-spacing': ['warn', 'always'],
        'key-spacing': ['warn', {
            beforeColon: false,
            afterColon: true,
        }],
        'no-new-object': ['warn'],
    }
};
