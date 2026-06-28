const testdata = {
  //UI
  URL: 'https://www.cheapflights.com.au',
  originLocation: 'MNL',
  destinationLocation: 'NRT',

  //API
  BASE_URL: 'https://restful-booker.herokuapp.com',
  auth: {
    username: 'admin',
    password: 'password123'
  },
  booking: {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01'
    },
    additionalneeds: 'Breakfast'
  },
  updatedBooking: {
    firstname: 'James',
    lastname: 'Brown',
    totalprice: 222,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-02-01',
      checkout: '2019-02-01'
    },
    additionalneeds: 'Dinner'
  },
  invalidBooking: {
    firstname: '',
    lastname: '',
    totalprice: 'invalid',
    depositpaid: 'yes',
    bookingdates: {
      checkin: '',
      checkout: ''
    },
    additionalneeds: ''
  },
  loginText: 'Log in'
};

module.exports = {
  testdata
};
