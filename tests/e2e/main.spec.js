var AngularDashPage = require('./main.po.js');
var AngularDashPage = new AngularDashPage();

describe('Game-> ', function() {

	it('should show characters', function() {
    browser.get('/#/game/');
		browser.driver.sleep(3000);
		expect(element(by.css('.item-0')).isPresent()).toBe(true);
		expect(element(by.css('.item-1')).isPresent()).toBe(true);
		expect(element(by.css('.item-2')).isPresent()).toBe(true);
	});
});




