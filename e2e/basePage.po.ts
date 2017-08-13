import { browser } from 'protractor';

export abstract class BasePage {
  public constructor(private readonly path: string) {
  }

  public navigateTo(): this {
    browser.get(`/${this.path}`);
    return this;
  }
}
