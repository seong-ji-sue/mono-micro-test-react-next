module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {jsx: true},
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
		'no-unused-vars': 'off',
		'react/display-name': 'off',
	},
};
