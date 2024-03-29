module.exports = {
	"env": {
	  "browser": true,
	  "commonjs": true,
	  "es2021": true,
	  "node":true
	},
	"extends": "eslint:recommended",
	"overrides": [],
	"parserOptions": {
	  "ecmaVersion": "latest"
	},
	"rules": {
	  "indent": [
			"error",
			"tab"
	  ],
	  "linebreak-style": [
			"error",
			"unix"
	  ],
	  "quotes": [
			"error",
			"double"
	  ],
	  "semi": [
			"error",
			"always"
	  ],
	  "camelcase": [
			"error"
	  ],
	  "no-unused-vars": [
			"warn"
	  ],
	  "no-console": [
			"warn"
		],
		"no-console":"off"
	}
};