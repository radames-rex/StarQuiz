var AngularDashPage = function() {

  this.token = element(by.model('weather'));

  this.init = function() {
	  browser.get('/#/dashboard/');
  };

};

module.exports = AngularDashPage;