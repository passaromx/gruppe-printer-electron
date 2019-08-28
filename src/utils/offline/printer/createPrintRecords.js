const axios = require('axios');
const persistPrintRecords = require('./persistPrintRecords');

const { apiURL } = require('../../../api/constants');

module.exports = async (client, printRecords) => {
  try {
    const response = await axios.post(`${apiURL}printRecords/bulk`, printRecords);
    if (response.status === 201) {
      console.log('bulk creation success');
    } else {
      // save data in local file
      persistPrintRecords(client, printRecords);
    }
  } catch (error) {
    // save data in local file
    persistPrintRecords(client, printRecords);
  }
};
