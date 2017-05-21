import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

export class SpitiUiPage {
  public navigateTo(): promise.Promise<void> {
    return browser.get('/');
  }

  public getParagraphText(): promise.Promise<string> {
    return element(by.css('spt-root md-toolbar')).getText();
  }
}
