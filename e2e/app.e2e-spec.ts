import { DmAppPage } from './app.po';

describe('dm-app App', function() {
  let page: DmAppPage;

  beforeEach(() => {
    page = new DmAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
