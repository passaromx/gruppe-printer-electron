const axios = require('axios');
const persistPrintRecords = require('./persistPrintRecords');

const { apiURL } = require('../../../api/constants');

module.exports = async (client, printRecords) => {
  try {
    const response = await axios.post(`${apiURL}printRecords`, printRecords);
    if (response.status === 200) {
      console.log(`created ${response.data.length} records`);
    }
  } catch (error) {
    // save data in local file
    console.log('persisting');
    persistPrintRecords(client, printRecords);
  }
};
