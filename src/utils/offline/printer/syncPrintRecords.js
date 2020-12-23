/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const electron = require('electron');
const axios = require('axios');
const fs = require('fs');
const { apiURL } = require('../../../api/constants');

const documentsPath = (electron.app || electron.remote.app).getPath('documents');

module.exports = id => new Promise(async (resolve, reject) => {
  const documentsDataPath = path.join(documentsPath, 'gruppe');

  if (!fs.existsSync(documentsDataPath)) {
    reject(new Error('no docs path'));
    return;
  }

  const clientPath = `${documentsDataPath}/${id}`;
  if (!fs.existsSync(clientPath)) {
    reject(new Error('no client path'));
    return;
  }

  const recordsPath = `${clientPath}/printRecords.json`;
  if (!fs.existsSync(recordsPath)) {
    reject(new Error('no records path'));
    return;
  }

  const records = JSON.parse(fs.readFileSync(recordsPath, 'utf-8'));
  if (records.length === 0) {
    reject(new Error('empty records array'));
    return;
  }

  try {
    const response = await axios.post(`${apiURL}printRecords`, records);
    if (response.status === 200) {
      fs.writeFileSync(recordsPath, '[]');
      resolve();
    }
  } catch (error) {
    reject(error);
  }
});
