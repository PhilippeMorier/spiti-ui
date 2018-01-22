import { LoginPage } from './login.po';

describe('spiti-ui App', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should display all menu links', () => {
    loginPage
      .navigateTo()
      .clickSignIn()
      .enterName('Philippe Morier')
      .enterEmail('philippe.morier@test.com');

    expect(loginPage.getToolbarItem(0).getText()).toEqual('Login');
    expect(loginPage.getToolbarItem(1).getText()).toEqual('Editor');
  });
});
