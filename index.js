const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');
const GetOrder=require("./waiverbyid")
const GetOrder2=require("./allwaiver")
const includeSessionKeyHeader = (request, z, bundle) => {
  z.console.log(bundle.authData.sessionKey);
  if (bundle.authData.sessionKey) {
    request.headers['Authorization'] = `Bearer ${bundle.authData.sessionKey}`;
  }

  return request;
};
module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [includeSessionKeyHeader],

  afterResponse: [...afters],

  // If you want your trigger to show up, you better include it here!
  triggers: {},

  // If you want your searches to show up, you better include it here!
  searches: {}, 

  // If you want your creates to show up, you better include it here!
  creates: { [GetOrder.key]:GetOrder},
  creates: { [GetOrder2.key]:GetOrder2},
  resources: {},
};
