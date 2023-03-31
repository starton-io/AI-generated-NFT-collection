/*
| Developed by Starton
| Filename : .eslintrc.js
*/

module.exports = {
	extends: ['next/core-web-vitals', '@starton/eslint-config-nextjs'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/restrict-template-expressions': 'off',
	},
}
