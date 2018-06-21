const loginCommands = {
  loginWithFacebook({ email, password }) {
    this.waitForElementVisible('@facebookLoginButton').click(
      '@facebookLoginButton',
    );

    return this.api.window_handles(windows => {
      this.api.switchWindow(windows.value[1]);

      this.waitForElementVisible('@facebookPopupEmailInput')
        .setValue('@facebookPopupEmailInput', email)
        .setValue('@facebookPopupPasswordInput', password)
        .waitForElementVisible('@facebookPopupLoginButton')
        .click('@facebookPopupLoginButton')
        .waitForElementVisible('body');

      // FIXME: figure out how to use @facebookPopupConfirmButton
      this.api.element('css selector', 'button[type=submit]', res => {
        // NOTE: If this is the first the user authenticates
        // a screen with "Confirm" button is shown.
        if (res.status !== -1) {
          this.click('@facebookPopupConfirmButton');
        }
      });

      this.api.switchWindow(windows.value[0]);
      return this.waitForElementVisible('body');
    });
  },
};

module.exports = {
  url() {
    return `${this.api.launchUrl}/auth/login`;
  },
  commands: [loginCommands],
  elements: {
    facebookLoginButton: {
      selector: 'button[name=facebook]',
    },
    googleLoginButton: {
      selector: 'button[name=google]',
    },
    facebookPopupEmailInput: {
      selector: 'input[name=email]',
    },
    facebookPopupPasswordInput: {
      selector: 'input[name=pass]',
    },
    facebookPopupLoginButton: {
      selector: 'input[type=submit]',
    },
    facebookPopupConfirmButton: {
      selector: 'button[type=submit]',
    },
  },
};
