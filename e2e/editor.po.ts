import { by, element } from 'protractor';
import { promise } from 'selenium-webdriver';

import { AppRoute } from '../src/app/app-routing.module';
import { BasePage } from './basePage.po';

export class EditorPage extends BasePage {
  public constructor() {
    super(AppRoute.Editor);
  }

  public getListItem(index: number): promise.Promise<string> {
    return element.all(by.css('li'))
      .get(index)
      .getText();
  }
}
