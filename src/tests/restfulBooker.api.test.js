const { expect } = require('chai');

const { APIEndpoints } = require('../fixtures/apiEndpoints');
const { apiRequest } = require('../helpers/apiHelper');
const { testdata } = require('../testdata/testdata.js');

describe('Restful Booker API Tests', function() {
  this.timeout(60000);

  describe('CreateBooking', function() {
    it('should return 200 with expected booking response fields', async function() {
      const response = await apiRequest('POST', APIEndpoints.createBooking(), testdata.booking);

      expect(response.status).to.equal(200);
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body.booking.firstname).to.equal(testdata.booking.firstname);
      expect(response.body.booking.lastname).to.equal(testdata.booking.lastname);
      expect(response.body.booking.totalprice).to.equal(testdata.booking.totalprice);
      expect(response.body.booking.depositpaid).to.equal(testdata.booking.depositpaid);
      expect(response.body.booking.bookingdates).to.deep.equal(testdata.booking.bookingdates);
      expect(response.body.booking.additionalneeds).to.equal(testdata.booking.additionalneeds);
    });

    it('should return 400 for malformed input (negative test)', async function() {
      const response = await apiRequest('POST', APIEndpoints.createBooking(), '{bad json');

      expect(response.status).to.equal(400);
    });
  });

  describe('UpdateBooking', function() {
    it('should return 200 with updated booking fields', async function() {
      const createdBooking = await apiRequest('POST', APIEndpoints.createBooking(), testdata.booking);
      const bookingId = createdBooking.body.bookingid;

      const response = await apiRequest(
        'PUT',
        APIEndpoints.updateBooking(bookingId),
        testdata.updatedBooking,
        true
      );

      expect(response.status).to.equal(200);
      expect(response.body.firstname).to.equal(testdata.updatedBooking.firstname);
      expect(response.body.lastname).to.equal(testdata.updatedBooking.lastname);
      expect(response.body.totalprice).to.equal(testdata.updatedBooking.totalprice);
      expect(response.body.depositpaid).to.equal(testdata.updatedBooking.depositpaid);
      expect(response.body.additionalneeds).to.equal(testdata.updatedBooking.additionalneeds);
    });

    it('should return 403 without authentication (negative test)', async function() {
      const createdBooking = await apiRequest('POST', APIEndpoints.createBooking(), testdata.booking);
      const bookingId = createdBooking.body.bookingid;

      const response = await apiRequest('PUT', APIEndpoints.updateBooking(bookingId), testdata.updatedBooking);

      expect(response.status).to.equal(403);
    });
  });

  describe('GetBooking', function() {
    it('should return 200 with booking response fields', async function() {
      const createdBooking = await apiRequest('POST', APIEndpoints.createBooking(), testdata.booking);
      const bookingId = createdBooking.body.bookingid;

      const response = await apiRequest('GET', APIEndpoints.getBooking(bookingId));

      expect(response.status).to.equal(200);
      expect(response.body.firstname).to.equal(testdata.booking.firstname);
      expect(response.body.lastname).to.equal(testdata.booking.lastname);
      expect(response.body.totalprice).to.equal(testdata.booking.totalprice);
      expect(response.body.depositpaid).to.equal(testdata.booking.depositpaid);
      expect(response.body.bookingdates).to.deep.equal(testdata.booking.bookingdates);
      expect(response.body.additionalneeds).to.equal(testdata.booking.additionalneeds);
    });

    it('should return 404 for a missing booking (negative test)', async function() {
      const response = await apiRequest('GET', APIEndpoints.getBooking(999999999));

      expect(response.status).to.equal(404);
    });
  });

  describe('DeleteBooking', function() {
    it('should return 201 when successfully deleting a booking', async function() {
      const createdBooking = await apiRequest('POST', APIEndpoints.createBooking(), testdata.booking);
      const bookingId = createdBooking.body.bookingid;

      const response = await apiRequest('DELETE', APIEndpoints.deleteBooking(bookingId), null, true);

      expect(response.status).to.equal(201);
    });

    it('should return 403 without authentication (negative test)', async function() {
      const createdBooking = await apiRequest('POST', APIEndpoints.createBooking(), testdata.booking);
      const bookingId = createdBooking.body.bookingid;

      const response = await apiRequest('DELETE', APIEndpoints.deleteBooking(bookingId));

      expect(response.status).to.equal(403);
    });
  });
});
