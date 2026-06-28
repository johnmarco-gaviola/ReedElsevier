const { testdata } = require('../testdata/testdata.js');

class APIEndpoints {
  static get baseUrl() {
    return testdata.BASE_URL;
  }

  static createBooking() {
    return `${this.baseUrl}/booking`;
  }

  static getBooking(id) {
    return `${this.baseUrl}/booking/${id}`;
  }

  static updateBooking(id) {
    return `${this.baseUrl}/booking/${id}`;
  }

  static deleteBooking(id) {
    return `${this.baseUrl}/booking/${id}`;
  }
}

module.exports = {
  APIEndpoints
};
