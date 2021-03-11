import { AppPage } from './app.po';
import { browser, logging, by, element, Browser } from 'protractor';
import { async } from 'q';

describe('dashboard', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('Table should have data', () => {
    let list = element.all(by.className('dashboard-element-row'));
    expect(list.count()).toBe(5);
  });

  it('Testing search', () => {
    let list = element.all(by.className('dashboard-element-row'));
    expect(list.count()).toBe(5);
    let searchField = element(by.id('search'));
    searchField.sendKeys('811');
    expect(list.count()).toBe(1);
    searchField.clear();
    searchField.sendKeys('2');
    expect(list.count()).toBe(3);
    searchField.clear();
    searchField.sendKeys('cc');
    expect(list.count()).toBe(0);
  });

  it('Test deletion operation', async (done: DoneFn) => {
    let list = element.all(by.className('dashboard-element-row'));
    let btn = element.all(by.className('customerDeleteBtn'));
    let yesBtn = element(by.id('yesDeleteBtn'));
    let noBtn = element(by.id('noDeleteBtn'));

    list.first().click();
    browser.sleep(200);
    btn.first().click();

    yesBtn.click();
    expect(list.count()).toBe(4);

    list.first().click();
    browser.sleep(200);
    btn.first().click();
    yesBtn.click();
    expect(list.count()).toBe(3);
    list.first().click();
    browser.sleep(200);
    btn.first().click();
    noBtn.click();

    list.last().click();
    browser.sleep(200);
    btn.last().click();
    noBtn.click();

    expect(list.count()).toBe(3);
    done();
  });


  it('Test1 edit should navigate to form', () => {
    let list = element.all(by.className('dashboard-element-row'));
    list.first().click();
    let btn = element.all(by.className('customerEditBtn'));
    browser.sleep(200);
    btn.first().click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/form/1565896455528');
  });


  it('Test2 edit should navigate to form', () => {
    let list = element.all(by.className('dashboard-element-row'));
    list.last().click();
    let btn = element.all(by.className('customerEditBtn'));
    browser.sleep(200);
    btn.last().click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/form/1565896455532');
  });

  it('Onclick add button it should navigate to form page', () => {
    let addButton = element(by.id('addCustomer'));
    addButton.click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:4200/form/0');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
