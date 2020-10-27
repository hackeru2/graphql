const GoogleSheetSchema = require('./GoogleSheetSchema.js');
const { authenticate } = require('./utils.js');

const keyValues = [
  [
    'Response', [
      'id',
      'type'
    ]
  ],
];

(async function init() {
  // Wait for Auth Client to Resolve
  try {
    const auth = await authenticate();

    /** Init Schema
     * @param  {process.env.SPREADSHEET_ID} spreadsheetId - ID of Spreadsheet
     * @param  {keyValues} schemaValues - 2D Array of Key Values for Map
     * @param  {auth} authClient - Google Auth Client
     */

    const schema = new GoogleSheetSchema({
      spreadsheetId: process.env.SPREADSHEET_ID,
      schemaValues: keyValues,
      authClient: auth
    });

    await schema.generateSheets();
    console.log('done');
  } catch (err) {
    console.log(err);
  }
})();