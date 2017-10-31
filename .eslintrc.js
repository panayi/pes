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
        "paths": [path.join(__dirname, 'src')],
      },
    },
  },
  "overrides": [
    {
      "files": ["backend/**/*.js"],
      "rules": {
        "no-console": "off",
      },
    },
    {
      "files": ["backend/functions/**/*.js", "backend/admin/**/*.js"],
      "settings": {
        "import/resolver": {
          "node": {
            "paths": [
              path.join(__dirname, 'backend', 'shared'),
            ],
          },
        },
      },
    },
    {
      "files": ["**/__tests__/**/*.js"],
      "env": {
        "jest": true
      },
      "globals": {
        "R": true,
        "shallow": true,
        "mount": true,
        "withMockStore": true,
        "noop": true,
      },
    },
  ],
};
