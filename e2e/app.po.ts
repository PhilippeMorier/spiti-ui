import { browser, element, by } from 'protractor';

export class SpitiUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('spt-root h1')).getText();
  }
}
