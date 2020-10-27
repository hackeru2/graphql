require('dotenv').config();
const { google } = require('googleapis');
const range = 'Sheet4!' + 'A1:B5';

async function getValues(auth) {
  // console.log(auth);
  const sheets = google.sheets('v4');
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      auth
    });
    const { data } = response;
    // console.log(JSON.stringify(data.values));
    // return singleArrayToJSON(data.values);
    return singleArrayToJSON(data.values);
    // singleArrayToJSON(data.values);
  } catch (err) {
    return err;
  }
}

async function addRow({ auth }, values) {
  const fields = Object.keys(values);
  const arrayValues = Object.keys(values).map(key => JSON.stringify(values[key]));
  const sheets = google.sheets('v4');
  try {
    const response = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [arrayValues]
      }
    });
    return true;
  } catch (err) {
    return false;
  }
}

function singleArrayToJSON(array) {
  const responses = [];
  const fields = array[0];
  for (let i = 1; i < array.length; i++) {
    const response = {};
    fields.forEach((field, index) => {
      const value = array[i][index];
      if (value) {
        console.log({ value });
        response[field] = value; // JSON.parse(value);
      } else {
        response[field] = null;
      }
    });
    responses.push(response);
  }
  return responses;
}

module.exports = {
  getValues, addRow
};