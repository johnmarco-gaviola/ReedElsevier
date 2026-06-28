const { chromium } = require('playwright');
const { testdata } = require('../testdata/testdata.js');
const { CheapflightsHomePage } = require('../pages/cheapflightsHomePage');
const { FlightResultsPage } = require('../pages/flightResultsPage');

let browser;
let context;
let page;

exports.mochaHooks = {
  async beforeAll() {
    browser = await chromium.launch({ headless: false });

    context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
  },

  async beforeEach() {
    this.timeout(120000);

    console.log('Creating page...');
    page = await context.newPage();

    console.log('Navigating...');
    await page.goto(testdata.URL, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    });

    console.log('Navigation complete');

    console.log('Creating page objects...');
    this.page = page;
    this.homePage = new CheapflightsHomePage(page);
    this.resultsPage = new FlightResultsPage(page);

    console.log('Completed');
  },

  async afterEach() {
    if (page) {
      await page.close();
    }
  },

  async afterAll() {
    await context.close();
    await browser.close();
  }
};

module.exports.getBrowser = () => browser;
module.exports.getContext = () => context;
module.exports.getPage = () => page;