/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const electron = require('electron');
const fs = require('fs');

const documentsPath = (electron.app || electron.remote.app).getPath('documents');
const documentsDataPath = path.join(documentsPath, 'gruppe');


module.exports = async (client, printRecords) => {
  const { id } = client;
  const recordsPath = `${documentsDataPath}/${id}/printRecords.json`;

  const recordsExist = fs.existsSync(recordsPath);
  let offlineRecords = [];
  if (recordsExist) {
    const records = JSON.parse(fs.readFileSync(recordsPath, 'utf-8'));
    offlineRecords = [...records, ...printRecords];
  } else {
    offlineRecords = [...printRecords];
  }

  fs.writeFileSync(recordsPath, JSON.stringify(offlineRecords));
};
