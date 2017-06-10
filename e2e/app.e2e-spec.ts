import { SpitiUiPage } from './app.po';

describe('spiti-ui App', () => {
  let page: SpitiUiPage;

  beforeEach(() => {
    page = new SpitiUiPage();
  });

  it('should display all menu links', () => {
    page.navigateTo();
    expect(page.getToolbarItem(0)).toEqual('Login');
    expect(page.getToolbarItem(1)).toEqual('Editor');
  });
});
