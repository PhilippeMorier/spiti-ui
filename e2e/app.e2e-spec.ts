import { SpitiUiPage } from './app.po';

describe('spiti-ui App', () => {
  let page: SpitiUiPage;

  beforeEach(() => {
    page = new SpitiUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('spt works!\nEditor');
  });
});
