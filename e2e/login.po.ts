import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

import { AppRoute } from '../src/app/app-routing.module';
import { BasePage } from './basePage.po';

export class LoginPage extends BasePage {
  public constructor() {
    super(AppRoute.Login);
  }

  public getToolbarItem(index: number): promise.Promise<string> {
    return element.all(by.css('mat-toolbar a'))
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

  public clickSignIn(): this {
    this.clickOnButton('signIn');
    return this;
  }

  private clickOnButton(name: string): void {
    browser.element(by.css(`button[name='${name}']`))
      .click();
  }

  private sendKeysToInput(input: string, name: string): void {
    browser.element(by.css(`input[name='${name}']`))
      .sendKeys(input);
  }
}
