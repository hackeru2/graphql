require('dotenv').config();
const { google } = require('googleapis');
//const range = 'Sheet4!' + 'A1:B5';
let range = '!' + 'A1:B10000';

async function getValues(auth, range) {
  console.log('g valuyes');
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

async function updateRow(auth, { name, where }) {
  if (where < 2) throw new Error('dont u dare go on the first field !!!');
  let range = 'cuisine!' + 'B' + where;
  var valueRangeBody =
  {
    values: [
      [
        name
      ]
    ],
    range,
    majorDimension: 'DIMENSION_UNSPECIFIED'
  };
  var params = {
    auth,
    includeValuesInResponse: true,
    responseDateTimeRenderOption: 'FORMATTED_STRING',
    responseValueRenderOption: 'FORMATTED_VALUE',
    valueInputOption: 'RAW',
    // The ID of the spreadsheet to update.
    spreadsheetId: process.env.SPREADSHEET_ID,  // TODO: Update placeholder value.
    range,
    resource: valueRangeBody
    // The A1 notation of the values to update.
    // TODO: Update placeholder value.

    // How the input data should be interpreted.
  };


  // TODO: Add desired properties to the request body. All existing properties
  // will be replaced.




  const sheets = google.sheets('v4');

  try {
    let { data } = await sheets.spreadsheets.values.update(params);
    let cell = data.updatedData.range.replace('cuisine!', '');
    return { name: data.updatedData.values[0][0], cell };
  } catch (reason) {
    console.error('error: ' + reason);
  }

}

async function addRow(auth, values) {

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

      console.log({ field });
      const value = array[i][index];
      if (value) {

        response[field] = value; // JSON.parse(value);
      } else {
        response[field] = null;
      }
    });
    response.meals = [{ type: + i + 'meals', id: i }];
    responses.push(response);
  }
  console.log(responses);
  return responses;
}

module.exports = {
  getValues, addRow, updateRow
};