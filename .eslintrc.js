const path = require('path');

module.exports = {
  "extends": [
    "plugin:flowtype/recommended",
    "airbnb",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "flowtype",
    "ramda",
  ],
  "rules": {
    "no-underscore-dangle": "off",
    "no-magic-numbers": ["warn", { // TODO: change to "error"
      "ignoreArrayIndexes": true,
      "ignore": [-1, 0, 1]
    }],

    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",

    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default-member": "off",

    "ramda/always-simplification": "error",
    "ramda/any-pass-simplification": "error",
    "ramda/both-simplification": "error",
    "ramda/complement-simplification": "error",
    "ramda/compose-pipe-style": "off",
    "ramda/compose-simplification": "error",
    "ramda/cond-simplification": "error",
    "ramda/either-simplification": "error",
    "ramda/eq-by-simplification": "error",
    "ramda/filter-simplification": "error",
    "ramda/if-else-simplification": "error",
    "ramda/map-simplification": "error",
    "ramda/merge-simplification": "error",
    "ramda/no-redundant-and": "error",
    "ramda/no-redundant-not": "error",
    "ramda/no-redundant-or": "error",
    "ramda/pipe-simplification": "error",
    "ramda/prefer-complement": "error",
    "ramda/prefer-ramda-boolean": "off",
    "ramda/prop-satisfies-simplification": "error",
    "ramda/reduce-simplification": "error",
    "ramda/reject-simplification": "error",
    "ramda/set-simplification": "error",
    "ramda/unless-simplification": "error",
    "ramda/when-simplification": "error",
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
      "settings": {
        "import/resolver": {
          "webpack": {
            "config": path.join(__dirname, 'backend', 'config', 'webpack.base.js')
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
