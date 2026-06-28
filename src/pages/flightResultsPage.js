class FlightResultsPage {
  constructor(page) {
    this.page = page;
    this.resultCards = page.locator('div.Fxw9-result-item-container');
  }

  async waitForResults() {
    await this.resultCards.first().waitFor({ state: 'visible', timeout: 30000 });
  }

  async getResultTotal() {
    return await this.resultCards.count();
  }

}

module.exports = {
  FlightResultsPage
};
