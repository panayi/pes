const loginCommands = {
  isLoggedIn() {
    return this
      .waitForElementVisible('body')
      .waitForElementVisible('@profileButton');
  },
};

module.exports = {
  commands: [loginCommands],
  elements: {
    profileButton: {
      selector: 'a[href="/profile"]',
    },
  },
};
