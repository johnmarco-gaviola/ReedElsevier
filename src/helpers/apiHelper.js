const { testdata } = require('../testdata/testdata.js');

async function apiRequest(method, endpoint, body = null, auth = false) {
  const headers = {
    Accept: 'application/json'
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const basicAuth = Buffer.from(
      `${testdata.auth.username}:${testdata.auth.password}`
    ).toString('base64');

    headers.Authorization = `Basic ${basicAuth}`;
  }

  const response = await fetch(endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  let parsedBody = text;

  try {
    parsedBody = text ? JSON.parse(text) : null;
  } catch {
    // leave as plain text when no JSON body is returned
  }

  return {
    status: response.status,
    body: parsedBody,
    text
  };
}

module.exports = {
  apiRequest
};
