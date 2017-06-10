import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

export class SpitiUiPage {
  public navigateTo(): promise.Promise<void> {
    return browser.get('/');
  }

  public getToolbarItem(index: number): promise.Promise<string> {
    return element.all(by.css('md-toolbar a'))
      .get(index)
      .getText();
  }
}
