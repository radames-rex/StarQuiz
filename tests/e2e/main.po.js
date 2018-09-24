var AngularDashPage = function() {

  this.token = element(by.model('starquiz'));

  this.init = function() {
	  browser.get('/#/start/');
  };

};

module.exports = AngularDashPage;