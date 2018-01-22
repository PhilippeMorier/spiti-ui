import { by, element, ElementFinder } from 'protractor';

import { AppRoute } from '../src/app/app-routing.module';
import { BasePage } from './basePage.po';

export class EditorPage extends BasePage {
  public constructor() {
    super(AppRoute.Editor);
  }

  public getListItem(index: number): ElementFinder {
    return element.all(by.css('li'))
      .get(index);
  }
}
