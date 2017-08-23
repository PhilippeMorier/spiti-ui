import { LoginPage } from './login.po';

describe('spiti-ui App', () => {
  let loginPage: LoginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
  });

  xit('should display all menu links', () => {
    loginPage
      .navigateTo()
      .enterName('Philippe Morier')
      .enterEmail('philippe.morier@test.com');

    expect(loginPage.getToolbarItem(0)).toEqual('Login');
    expect(loginPage.getToolbarItem(1)).toEqual('Editor');
  });
});
