const { expect } = require('chai');
const { testdata } = require('../testdata/testdata')

describe('Cheapflights UI Tests', function() {
  this.timeout(120000);

  describe('Logo and Login Button', function() {
    it('should display the logo and login button on the home', async function() {

      expect(await this.homePage.logo.isVisible()).to.be.true;
      expect(await this.homePage.loginButton.isVisible()).to.be.true;
      
    });
  });

  describe('Flight Search', function() {
    it('should display search form elements and verify their positions', async function() {

      expect(await this.homePage.originInput.isVisible()).to.be.true;
      expect(await this.homePage.destinationInput.isVisible()).to.be.true;
      expect(await this.homePage.searchButton.isVisible()).to.be.true;


    });

    it('should allow searching for flights and display results content', async function() {

      await this.homePage.fillOrigAndDesti(testdata.originLocation, testdata.destinationLocation);
      await this.homePage.selectDateRange();
      await this.homePage.clickSearch();

      await this.resultsPage.waitForResults();
      const count = await this.resultsPage.getResultTotal();
      expect(count).to.be.greaterThan(0);
    });

    it('empty Origin and Destination (negative test)', async function() {

      await this.homePage.emptyOrigAndDesti()
      await this.homePage.selectDateRange();
      
      await this.homePage.clickSearch();

       await this.homePage.waitForSearchError();

      expect(await this.homePage.fromAirportError.isVisible()).to.be.true;
      expect(await this.homePage.toAirportError.isVisible()).to.be.true;
    });
  });
});
