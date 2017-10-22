const path = require('path');

module.exports = {
  "extends": [
    "plugin:flowtype/recommended",
    "airbnb"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "flowtype"
  ],
  "rules": {
    "react/jsx-filename-extension": "off",
    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "no-underscore-dangle": "off",
    "import/no-named-as-default-member": "off"
  },
  "env": {
    "browser": true,
    "es6": true,
    "mocha": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [path.resolve(__dirname, './src')],
      },
    },
  },
};
