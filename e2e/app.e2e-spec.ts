import { NGAPPPage } from './app.po';

describe('ngapp App', () => {
  let page: NGAPPPage;

  beforeEach(() => {
    page = new NGAPPPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
