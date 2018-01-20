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
    loginPage.navigateTo();
    editorPage.navigateTo();
    loginPage.navigateTo()
      .clickSignIn()
      .enterName('Philippe Morier')
      .enterEmail('philippe.morier@test.com');

    expect(loginPage.getToolbarItem(0)).toEqual('Login');
    expect(loginPage.getToolbarItem(1)).toEqual('Editor');
  });
});
