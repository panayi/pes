export default {
  'User is remembered on page refresh': client => {
    const loginPage = client.page.loginPage();
    const loggedInPage = client.page.loggedInPage();

    loginPage.navigate().loginWithFacebook({
      email: client.globals.facebookUser.email,
      password: client.globals.facebookUser.password,
    });

    loggedInPage.isLoggedIn().api.refresh();

    loggedInPage.isLoggedIn();

    client.end();
  },
  'User is remembered in a new window': client => {
    const loginPage = client.page.loginPage();
    const loggedInPage = client.page.loggedInPage();
    const homePage = client.page.homePage();
    const homePageUrl = homePage.url.bind({ api: client })();

    loginPage.navigate().loginWithFacebook({
      email: client.globals.facebookUser.email,
      password: client.globals.facebookUser.password,
    });

    loggedInPage.isLoggedIn();

    client
      .execute(
        url => {
          window.open(url, null);
        },
        [homePageUrl],
      )
      .window_handles(function callback(result) {
        this.switchWindow(result.value[2]);
      })
      .page.loggedInPage()
      .isLoggedIn();

    client.end();
  },
};
