import { browser, by, element, protractor } from 'protractor';
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
      .enterEmail('morier.dev@outlook.com')
      .enterPassword('morier.dev')
      .clickSignIn();

    expect(loginPage.getToolbarItem(0).getText()).toEqual('Sign In');
    expect(loginPage.getToolbarItem(1).getText()).toEqual('Editor');
  });

  it('should display all list items', () => {
    editorPage.navigateTo();

    browser.wait(
      protractor.ExpectedConditions.presenceOf(element(by.css('ul'))),
    );

    expect(editorPage.getListItem(0).getText()).toEqual('ApplePulp');
  });
});
