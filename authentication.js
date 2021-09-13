'use strict';

// You want to make a request to an endpoint that is either specifically designed
// to test auth, or one that every user will have access to. eg: `/me`.
// By returning the entire request object, you have access to the request and
// response data for testing purposes. Your connection label can access any data
// from the returned response using the `json.` prefix. eg: `{{json.username}}`.
const test = (z, bundle) =>
  z.request({ url: 'https://api.otterwaiver.com/participants/latest' });

const getSessionKey =  (z, bundle) => {
  const promise =  z.request({
    url: 'https://api.otterwaiver.com/auth/connect',
    method: 'POST',
    body: {
      client_id: bundle.authData.client_id,
      client_secret: bundle.authData.client_secret,
      grant_type: 'client_credentials',
      scope: 'api'
    },
  });
  return promise.then((response) => {
    if (response.status === 401) {
      throw new Error('The Client ID/Client secret you supplied is invalid');
    }
    const json = JSON.parse(response.content);
    return {
      sessionKey: json.token
    };
  });
  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.
  
};

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.


module.exports = {
  config: {
    // "session" auth exchanges user data for a different session token (that may be
    // periodically refreshed")
    type: 'session',
    sessionConfig: { perform: getSessionKey },

    // Define any input app's auth requires here. The user will be prompted to enter
    // this info when they connect their account.
    fields: [
      { key: 'client_id', label: 'Client Id', required: true },
      {
        key: 'client_secret',
        label: 'Client Secret',
        required: true,

    
       
      },
    ],

    // The test method allows Zapier to verify that the credentials a user provides
    // are valid. We'll execute this method whenever a user connects their account for
    // the first time.
    test,

    // This template string can access all the data returned from the auth test. If
    // you return the test object, you'll access the returned data with a label like
    // `{{json.X}}`. If you return `response.data` from your test, then your label can
    // be `{{X}}`. This can also be a function that returns a label. That function has
    // the standard args `(z, bundle)` and data returned from the test can be accessed
    // in `bundle.inputData.X`.
    connectionLabel: '{{client_id}}',
  }
  
};
