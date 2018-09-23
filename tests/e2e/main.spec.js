var AngularDashPage = require('./login.po.js');
var AngularDashPage = new AngularDashPage();

describe('Dashboard-> ', function() {

	it('should cards', function() {
    browser.get('/#/dashboard/');
		browser.driver.sleep(3000);
		expect(element(by.css('.card-0')).isPresent()).toBe(true);
		expect(element(by.css('.card-1')).isPresent()).toBe(true);
		expect(element(by.css('.card-2')).isPresent()).toBe(true);
	});
});




