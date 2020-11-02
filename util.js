require('dotenv').config();
const { google } = require('googleapis');
const { random, groupBy } = require('lodash');
//const range = 'Sheet4!' + 'A1:B5';
let range = '!' + 'A1:B10000';


async function groupPivot(auth, range) {

  return await getValues(auth, range);
  return Object.values(groupBy(response, 'cuisine_id'));
}
async function getValues(auth, range) {

  // console.log(auth);
  const sheets = google.sheets('v4');
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      auth
    });
    const { data } = response;


    let values = data.values.filter(row => row[0]);
    console.log({ getValues: values[0] });
    return singleArrayToJSON(values);
    // singleArrayToJSON(data.values);
  } catch (err) {
    return err;
  }
}


async function getRow(auth, ranges) {

  console.log({ ranges });
  var params = {
    spreadsheetId: process.env.SPREADSHEET_ID,
    auth,
    ranges,//: ['cuisine!A1:B1', 'cuisine!A2:B2'],  // TODO: Update placeholder value.
    valueRenderOption: 'FORMATTED_VALUE',
    dateTimeRenderOption: 'FORMATTED_STRING',
  };

  const sheets = google.sheets('v4');
  let response = {};
  try {
    response = await sheets.spreadsheets.values.batchGet(params);


  } catch (reason) {
    console.error('error in get row : ' + reason);
  }
  return arrToObj(response.data.valueRanges.flatMap(arr => arr.values));

}

async function updateRow(auth, { name, where, sheet }) {
  if (!sheet) sheet = 'cuisine';
  if (where < 2) throw new Error('dont u dare go on the first field !!!');
  let range = sheet + '!' + 'B' + where;
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


  console.log('range', range);

  const sheets = google.sheets('v4');

  try {
    let { data } = await sheets.spreadsheets.values.update(params);

    let cell = data.updatedData.range.replace('cuisine!', '');
    return { name: data.updatedData.values[0][0], cell };
  } catch (reason) {
    throw Error(reason);
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
function arrToObj(arr) {
  let fields = arr[0], obj = {},
    row = arr[1];
  fields.forEach((field, i) => {
    obj[field] = row[i];

  });
  obj.meals = [];
  console.log(obj);
  // return { id: Math.ceil(Math.random() * 100), type: new Date(), meals: [] };
  return obj;
}
function singleArrayToJSON(array) {
  const responses = [];
  const fields = array[0];

  for (let i = 1; i < array.length; i++) {
    const response = {};
    fields.forEach((field, index) => {


      const value = array[i][index];
      if (value) {

        response[field] = value; // JSON.parse(value);
      } else {
        response[field] = null;
      }
    });
    // response.meals = [{ type: + i + 'meals', id: i }];
    //  console.log('response', response);
    responses.push(response);
  }

  return responses;
}

module.exports = {
  getValues, addRow, updateRow, getRow, groupPivot
};