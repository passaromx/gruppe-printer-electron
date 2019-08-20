/* eslint-disable import/no-extraneous-dependencies */

const electron = require('electron');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
// const request = require('request');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

// const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const documentsPath = (electron.app || electron.remote.app).getPath('documents');

module.exports = client => new Promise((resolve, reject) => {
  const id = client._id;
  const documentsDataPath = path.join(documentsPath, 'gruppe');
  const documentsExists = fs.existsSync(`${documentsDataPath}/${id}`);
  if (!documentsExists) {
    reject();
    throw new Error("path doesn't exists");
  }

  const notFoundExists = fs.existsSync(`${documentsDataPath}/${id}/filesNotFound.json`);

  if (!notFoundExists) {
    resolve('file not found');
  }

  const filesNotFound = JSON.parse(fs.readFileSync(`${documentsDataPath}/${id}/filesNotFound.json`, 'utf8'));

  async function processRequest(data) {
    try {
      const file = fs.createReadStream(data.prn);
      // console.log('url', `${apiURL}labels/restore`);
      const formData = new FormData();

      formData.append('labelId', data.labelId);
      formData.append('file', file);

      console.log('restoring', data.labelId);
      const response = await axios.post(`${apiURL}labels/restore`, formData, { headers: formData.getHeaders() });

      if (response.data) console.log('restored');
    } catch (error) {
      console.log('exception', error);
    }
  }

  async function restoreFiles(files) {
    /* eslint-disable-next-line */
    for (const file of files) {
      if (file.prn) {
        /* eslint-disable-next-line */
        await processRequest(file);
      }
    }
    resolve();
  }

  if (filesNotFound.length > 0) {
    restoreFiles(filesNotFound);
  } else {
    resolve();
  }
});
