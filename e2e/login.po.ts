import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

export class LoginPage {
  public navigateTo(): this {
    browser.get('/login');
    return this;
  }

  public getToolbarItem(index: number): promise.Promise<string> {
    return element.all(by.css('md-toolbar a'))
      .get(index)
      .getText();
  }

  public enterName(name: string): this {
    this.sendKeysToInput(name, 'displayName');
    return this;
  }

  public enterEmail(email: string): this {
    this.sendKeysToInput(email, 'email');
    return this;
  }

  private sendKeysToInput(input: string, name: string): void {
    browser.element(by.css(`input[name='${name}']`))
      .sendKeys(input);
  }
}
