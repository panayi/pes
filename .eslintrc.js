const path = require('path');

module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "ramda",
    "import"
  ],
  "rules": {
    "no-underscore-dangle": "off",

    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"],
      "aspects": ["noHref", "invalidHref", "preferButton"],
    }],
    "jsx-a11y/click-events-have-key-events": "off",

    // See why we do this here:
    // https://github.com/facebook/create-react-app/issues/2631#issuecomment-312894470

    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",

    "import/no-named-as-default": "off",
    "import/prefer-default-export": "off",
    "import/no-named-as-default-member": "off",
    "import/named": "error",
    "import/newline-after-import": "error",
    "import/no-anonymous-default-export": "error",

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
  "overrides": [
    {
      "files": ["packages/server/application/src/**/*.js"],
      "settings": {
        "import/resolver": {
          "webpack": {
            "config": path.join(__dirname, 'tools', 'config', 'webpack.base.js')
          },
        },
      },
    },
    {
      "files": ["packages/client/manager/src/**/*.js"],
      "settings": {
        "import/resolver": {
          "node": {
            "moduleDirectory": ["node_modules", "packages/client/manager/src"]
          },
        },
      },
    },
    {
      "files": ["packages/client/web/src/**/*.js"],
      "settings": {
        "import/resolver": {
          "node": {
            "moduleDirectory": ["node_modules", "packages/client/web/src"]
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
