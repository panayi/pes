export default {
  'Facebook button exists on login page': client => {
    const loginPage = client.page.loginPage();

    loginPage.navigate().waitForElementVisible('@facebookLoginButton');

    client.end();
  },
  'Facebook button opens facebook login popup on click': client => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .waitForElementVisible('@facebookLoginButton')
      .click('@facebookLoginButton');

    client.window_handles(windows => {
      client.switchWindow(windows.value[1]);

      loginPage.waitForElementVisible('@facebookPopupEmailInput');

      client.verify.title('Facebook').end();
    });
  },
  'Given that I am logged out, when I click Facebook button, I can login': () => {},
  'Given that I am I logged in with Facebook, when I view the login page, then I should be navigated to homepage.': () => {},
  'Given that I have never logged in with Facebook, when I login with Facebook, the system should save the following Facebook account details: photo, email, name.': () => {},

  'Given that I have logged in (in the past) with another method, when I login with Facebook with the same email, then my accounts are merged': () => {},

  'Given that I have logged in (in the past) with another method, when I login with Facebook, I should see the same account': () => {},

  'Given that I have cancelled Facebook login, when I try to login with Facebook again, it should work the same': () => {},

  'Given that I have removed the app from Facebook, when I try to login with Facebook, I should see my existing account': () => {},
};
