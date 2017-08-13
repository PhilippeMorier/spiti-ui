import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

export class EditorPage {
  public navigateTo(): this {
    browser.get('/editor');
    return this;
  }

  public getListItem(index: number): promise.Promise<string> {
    return element.all(by.css('li'))
      .get(index)
      .getText();
  }
}
