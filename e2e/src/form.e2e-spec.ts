import { AppPage } from './app.po';
import { browser, logging, by, element, protractor } from 'protractor';
import { async } from 'q';

describe('form', () => {
    let page: AppPage;
    let addBtn = element(by.id('add-new-entry'));
    let updateBtn = element(by.id('update-entry'));
    let deleteBtn = element(by.id('delete-entry'));
    let backBtn = element(by.id('backBtn'));


    let yesBtn = element(by.id('yesDeleteBtn'));
    let noBtn = element(by.id('noDeleteBtn'));

    let firstName = element(by.css('input[formControlName=firstName]'));
    let lastName = element(by.css('input[formControlName=lastName]'));
    let email = element(by.css('input[formControlName=email]'));
    let mobileNumber = element(by.css('input[formControlName=mobileNumber]'));
    let country = element(by.css('input[formControlName=country]'));
    let city = element(by.css('input[formControlName=city]'));
    let address = element(by.css('textarea[formControlName=address]'));
    let pinCode = element(by.css('input[formControlName=pinCode]'));

    let keys = [
        {
            f: 'firstName',
            a: '12223A',
            b: 'aaaaaa',
            c: 'aaaaaaa',
            d: ' ',
            prop: firstName,

            e_msg1: 'Enter first name',
            e_msg2: 'Enter only alphabets'
        },
        {
            f: 'lastName',
            a: '15sA',
            b: 'aaaaaa',
            c: 'ccccccccc',
            d: ' ',
            prop: lastName,

            e_msg1: 'Enter last name',
            e_msg2: 'Enter only alphabets'
        },
        {
            f: 'email',
            a: '15sA',
            b: 'aaaaa2a',
            c: 'as12@c.m',
            d: ' ',
            prop: email,

            e_msg1: 'Enter email id',
            e_msg2: 'Enter valid email id'
        },
        {
            f: 'mobilenumber',
            a: '145678910AB',
            b: '222223333',
            c: '14234567894',
            d: ' ',
            prop: mobileNumber,

            e_msg1: 'Enter mobile number',
            e_msg2: 'Enter only numbers\nShould have minimum 10 numbers',
            e_msg3: 'Should have minimum 10 numbers'
        },
        {
            f: 'country',
            a: '15sA',
            b: 'aaaaaa',
            c: 'world',
            d: ' ',
            prop: country,

            e_msg1: 'Enter country name',
            e_msg2: 'Enter only alphabets'
        },
        {
            f: 'city',
            a: '12223A',
            b: 'aaaaaa',
            c: 'aaaaaaa',
            d: ' ',
            prop: city,

            e_msg1: 'Enter city name',
            e_msg2: 'Enter only alphabets'
        },
        {
            f: 'pinCode',
            a: 'ABCDEF',
            b: '222223333',
            c: '123456',
            d: ' ',
            prop: pinCode,

            e_msg1: 'Enter pincode',
            e_msg2: 'Enter only numbers\nShould have 6 numbers',
            e_msg3: 'Should have 6 numbers'
        },
    ];

    function clearKeys() {
        firstName.clear();
        lastName.clear();
        email.clear();
        mobileNumber.clear();
        country.clear();
        city.clear();
        address.clear();
        pinCode.clear();
    }
    function InitialiseKeys() {
        clearKeys();
        firstName.sendKeys('para');
        lastName.sendKeys('word');
        email.sendKeys('john@v.com');
        mobileNumber.sendKeys('12345678910');
        country.sendKeys('heaven');
        city.sendKeys('villa');
        address.sendKeys('heaven villa sky max');
        pinCode.sendKeys('123645');
    }
    beforeEach(() => {
        page = new AppPage();
    });

    it('Test1 title', () => {
        browser.get(browser.baseUrl + 'form/0');
        let title = element(by.className('form-title'));
        expect(title.getText()).toBe('New Customer Entry');
    });

    it('Test2 title', () => {
        browser.get(browser.baseUrl + 'form/123445');
        let title = element(by.className('form-title'));
        browser.sleep(200);
        expect(title.getText()).toBe('Edit Customer Detail');
    });
    it('Test1 add button to be disabled', () => {
        browser.get(browser.baseUrl + 'form/0');
        expect(addBtn.isEnabled()).toBe(false);
    });

    describe('New Customer Entry', () => {
        beforeEach(() => {
            browser.get(browser.baseUrl + 'form/0');
            InitialiseKeys();
        });

        it('Test add button to be enabled', () => {
            expect(addBtn.isEnabled()).toBe(true);
        });

        for (let testObj of keys) {

            it('Test ' + (testObj.f) + ' field', () => {
                testObj.prop.clear();
                testObj.prop.sendKeys(testObj.d);

                browser.sleep(500);
                expect(element(by.tagName('mat-error')).getText()).toBe(testObj.e_msg2);
                expect(addBtn.isEnabled()).toBe(false);

                testObj.prop.clear();
                testObj.prop.sendKeys(testObj.a);

                if ((testObj.prop !== pinCode && testObj.prop !== mobileNumber)) {
                    expect(element(by.tagName('mat-error')).getText()).toBe(testObj.e_msg2);
                } else {
                    expect(element(by.tagName('mat-error')).getText()).toBe('Enter only numbers');
                }

                expect(addBtn.isEnabled()).toBe(false);

                testObj.prop.sendKeys(testObj.b, protractor.Key.CONTROL, 'a', protractor.Key.BACK_SPACE);
                expect(element(by.tagName('mat-error')).getText()).toBe(testObj.e_msg1);

                expect(addBtn.isEnabled()).toBe(false);

                testObj.prop.sendKeys(testObj.c);
                expect(addBtn.isEnabled()).toBe(true);
            });
        }

        it('Test address field', () => {
            address.clear();
            address.sendKeys('aaaaaa', protractor.Key.CONTROL, 'a', protractor.Key.BACK_SPACE);
            expect(element(by.tagName('mat-error')).getText()).toBe('Enter address');

            expect(addBtn.isEnabled()).toBe(false);

            address.sendKeys('ssssssss');
            expect(addBtn.isEnabled()).toBe(true);
        });

        it('add button should naviage back when click', () => {
            browser.get(browser.baseUrl);
            browser.get(browser.baseUrl + 'form/0');
            InitialiseKeys();
            addBtn.click();
            browser.sleep(1000);
            expect(browser.getCurrentUrl()).toBe('http://localhost:4200/dashboard');
        });


    });


    describe('Update Customer Entry', () => {
        beforeEach(() => {
            browser.get(browser.baseUrl + 'form/1565896455531');
            browser.sleep(500);
        });

        it('Test update button to be enabled', () => {
            expect(updateBtn.isEnabled()).toBe(true);
        });


        for (let testObj of keys) {

            it('Test ' + (testObj.f) + ' field', () => {
                testObj.prop.clear();
                testObj.prop.sendKeys(testObj.d);

                browser.sleep(500);
                expect(element(by.tagName('mat-error')).getText()).toBe(testObj.e_msg2);
                expect(updateBtn.isEnabled()).toBe(false);

                testObj.prop.clear();
                testObj.prop.sendKeys(testObj.a);
                if ((testObj.prop !== pinCode && testObj.prop !== mobileNumber)) {
                    expect(element(by.tagName('mat-error')).getText()).toBe(testObj.e_msg2);
                } else {
                    expect(element(by.tagName('mat-error')).getText()).toBe('Enter only numbers');
                }
                expect(updateBtn.isEnabled()).toBe(false);

                testObj.prop.sendKeys(testObj.b, protractor.Key.CONTROL, 'a', protractor.Key.BACK_SPACE);
                expect(element(by.tagName('mat-error')).getText()).toBe(testObj.e_msg1);
                expect(updateBtn.isEnabled()).toBe(false);

                testObj.prop.sendKeys(testObj.c);

                expect(updateBtn.isEnabled()).toBe(true);
            });
        }

        it('Test address field', () => {
            address.clear();
            address.sendKeys('aaaaaa', protractor.Key.CONTROL, 'a', protractor.Key.BACK_SPACE);

            expect(element(by.tagName('mat-error')).getText()).toBe('Enter address');

            expect(updateBtn.isEnabled()).toBe(false);

            address.sendKeys('ssssssss');
            expect(updateBtn.isEnabled()).toBe(true);
        });

        it('Deletedialog-> should not delete when click no', () => {
            browser.get(browser.baseUrl + 'form/1565896455531');
            deleteBtn.click();
            browser.sleep(500);
            noBtn.click();
            browser.sleep(500);
            expect(browser.getCurrentUrl()).toBe('http://localhost:4200/form/1565896455531');
        });

        it('Deletedialog-> should naviage back when click yes', () => {
            browser.get(browser.baseUrl);
            browser.get(browser.baseUrl + 'form/1565896455531');
            deleteBtn.click();
            browser.sleep(500);
            yesBtn.click();
            browser.sleep(1000);
            expect(browser.getCurrentUrl()).toBe('http://localhost:4200/dashboard');
        });

        it('Update button should naviage back when click', () => {
            browser.get(browser.baseUrl);
            browser.get(browser.baseUrl + 'form/1565896455531');
            updateBtn.click();
            browser.sleep(1000);
            expect(browser.getCurrentUrl()).toBe('http://localhost:4200/dashboard');
        });


    });

    it('back button should naviage back on click', () => {
        browser.get(browser.baseUrl);
        browser.get(browser.baseUrl + 'form/0');
        backBtn.click();
        browser.sleep(1000);
        expect(browser.getCurrentUrl()).toBe('http://localhost:4200/dashboard');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
