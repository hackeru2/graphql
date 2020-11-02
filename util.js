require('dotenv').config();
const { google } = require('googleapis');
const { random, groupBy } = require('lodash');
//const range = 'Sheet4!' + 'A1:B5';
let range = '!' + 'A1:B10000';
const spreadsheetId = process.env.SPREADSHEET_ID;

async function groupPivot(auth, range) {

  return await getValues(auth, range);
  // return Object.values(groupBy(response, 'cuisine_id'));
}
async function getValues(auth, range) {

  // console.log(auth);
  const sheets = google.sheets('v4');
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
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
    spreadsheetId,
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
    return {};
  }
  return arrToObj(response.data.valueRanges.flatMap(arr => arr.values));

}






async function updateRow(auth, args) {
  let pos = Number(args.id) + 1;

  // if (args.id < 2) throw new Error(args.id + ' <-  dont u dare go on the first field !!!');
  let range = 'recipes!' + 'D' + pos + ':E' + pos;
  var valueRangeBody =
  {

    values: [
      [
        args.meal_id,
        args.cuisine_id,
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
    spreadsheetId,  // TODO: Update placeholder value.
    range,
    resource: valueRangeBody

  };


  const sheets = google.sheets('v4');

  try {
    let { data } = await sheets.spreadsheets.values.update(params);
    console.log('data.updatedData.values', data.updatedData.values);
    //let cell = data.updatedData.range.replace('cuisine!', '');
    return { meal_id: data.updatedData.values[0][0], cuisine_id: data.updatedData.values[0][1], id: args.id }; // cell };
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


      let value = array[i][index];
      if (value) {
        if (field == 'id') value = Number(value);
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
  getValues, addRow, updateRow, getRow, groupPivot
};


