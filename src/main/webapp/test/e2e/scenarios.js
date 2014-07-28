'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('dqm app', function() {

  browser.get('index.html');

  it('should automatically redirect to /checks when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/checks");
  });


  describe('checks', function() {

    beforeEach(function() {
      browser.get('index.html#/checks');
    });


    it('should render checks when user navigates to /checks', function() {
      expect(element.all(by.id('tester')).first().getText()).
        toMatch(/All checks/);
    });

  });


  describe('check-detail', function() {

    beforeEach(function() {
      browser.get('index.html#/checks/3');
    });


    it('should render check-detail 3 when user navigates to /checks/3', function() {
      expect(element.all(by.id('tester')).first().getText()).
        toMatch(/detail view for 3/);
    });

  });
});
