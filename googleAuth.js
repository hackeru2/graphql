const keys = require('./keys.json');
const { google } = require('googleapis');
const client = new google.auth.JWT(
  keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function (err, tokens) {
  if (err) {
    return console.log('err', err);

  } else console.log('connected!');
  return gsRun(client);
});

async function gsRun(cl) {

  return google.sheets({ version: 'v4', auth: cl });
}


module.exports = {
  client
};