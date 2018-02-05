import { EditorPage } from './editor.po';
import { LoginPage } from './login.po';

describe('spiti-ui App', () => {
  let loginPage: LoginPage;
  let editorPage: EditorPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    editorPage = new EditorPage();
  });

  it('should display all menu links', () => {
    loginPage
      .navigateTo()
      .clickSignIn()
      .enterName('Philippe Morier')
      .enterEmail('philippe.morier@test.com');

    expect(loginPage.getToolbarItem(0).getText()).toEqual('Sign In');
    expect(loginPage.getToolbarItem(1).getText()).toEqual('Editor');
  });

  xit('should display all list items', () => {
    editorPage.navigateTo();

    expect(editorPage.getListItem(0).getText()).toEqual('ApplePulp');
  });
});
