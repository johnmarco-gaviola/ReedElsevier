class CheapflightsHomePage {
  constructor(page) {
    this.page = page;

    this.logo = page.locator('a[aria-label="Go to the cheapflights homepage"]').first();
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
    this.originInput = page.getByRole('combobox', { name: 'Origin location' });
    this.removeOriginButton = page.getByRole('button', { name: 'Remove value' }).first();
    this.destinationInput = page.getByRole('combobox', { name: 'Destination location' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.departureDatePicker = page.getByRole('button', { name: 'Departure date' });
    this.returnDatePicker = page.getByRole('button', { name: 'Return date' });
    this.nextMonthButton = page.getByRole('button', { name: 'Next month' });
    this.previousMonthButton = page.getByRole('button', { name: 'Previous month' });
    this.fromAirportError = page.getByRole('alert').filter({ hasText: "Please enter a 'From' airport." });
    this.toAirportError = page.getByRole('alert').filter({ hasText: "Please enter a 'To' airport." });

  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async fillOrigAndDesti(origin, destination) {
    const originSuggestion = this.page.locator('div').filter({ hasText: origin }).first();
    const destinationSuggestion = this.page.locator('div').filter({ hasText: destination }).first();

    await this.removeOriginButton.click();
    await this.originInput.fill(origin);
    // await this.page.pause();
    await originSuggestion.waitFor({state: 'visible', timeout: 5000});
    await originSuggestion.click();

    await this.destinationInput.fill(destination);
    await destinationSuggestion.waitFor({state: 'visible', timeout: 5000});
    await destinationSuggestion.click();
  }

  async emptyOrigAndDesti() {
    await this.removeOriginButton.click();
    await this.originInput.fill('');
    await this.destinationInput.fill('');
  }

  async openDatePicker() {
    await this.departureDatePicker.click();
  }

  async selectDate(date) {
    const month = date.toLocaleString('en-AU', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    await this.page.getByRole('button', { name: new RegExp(`^${month} ${day} ${year}`) }).click();
  }

  async selectDateRange() {
    await this.departureDatePicker.click();

    const today = new Date();

    const departure = new Date(today);
    departure.setMonth(departure.getMonth() + 1);

    const returning = new Date(departure);
    returning.setDate(returning.getDate() + 7);

    await this.nextMonthButton.click();

    await this.selectDate(departure);
    await this.selectDate(returning);
  }

  async waitForSearchError() {
    await this.fromAirportError.waitFor({ state: 'visible', timeout: 5000 });
    await this.toAirportError.waitFor({ state: 'visible', timeout: 5000 });
  }
}

module.exports = {
  CheapflightsHomePage
};