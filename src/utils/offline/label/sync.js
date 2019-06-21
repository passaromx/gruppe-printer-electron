/* eslint-disable import/no-extraneous-dependencies */
const request = require('request');
const electron = require('electron');
const path = require('path');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const documentsPath = (electron.app || electron.remote.app).getPath('documents');
module.exports = client => new Promise((resolve, reject) => {
  let forceSync = false;
  const id = client._id;
  const dataPath = path.join(userDataPath, 'data');
  const dataPathExists = fs.existsSync(`${dataPath}`);
  if (!dataPathExists) {
    forceSync = true;
    fs.mkdirSync(path.join(userDataPath, 'data'), { recursive: true });
  }
  const documentsDataPath = path.join(documentsPath, 'gruppe');
  const documentsDataPathExists = fs.existsSync(`${documentsDataPath}`);
  if (!documentsDataPathExists) {
    forceSync = true;
    fs.mkdirSync(path.join(documentsPath, 'gruppe'), { recursive: true });
  }
  const clientExists = fs.existsSync(`${dataPath}/${id}`);
  if (!clientExists) {
    forceSync = true;
    fs.mkdirSync(`${dataPath}/${id}`, { recursive: true });
    fs.mkdirSync(`${dataPath}/${id}/uploads`, { recursive: true });
  }
  const clientDocumentsExists = fs.existsSync(`${documentsDataPath}/${id}`);
  if (!clientDocumentsExists) {
    forceSync = true;
    fs.mkdirSync(`${documentsDataPath}/${id}`, { recursive: true });
    fs.mkdirSync(`${documentsDataPath}/${id}/uploads`, { recursive: true });
  }

  let config = fs.existsSync(`${dataPath}/${id}/config.json`);
  if (config) {
    config = JSON.parse(fs.readFileSync(`${dataPath}/${id}/config.json`, 'utf8'));
  } else {
    forceSync = true;
    fs.writeFileSync(`${dataPath}/${id}/config.json`, '{}');
    config = {};
  }


  let labels = fs.existsSync(`${documentsDataPath}/${id}/labels.json`);
  if (labels) {
    labels = JSON.parse(fs.readFileSync(`${documentsDataPath}/${id}/labels.json`, 'utf8'));
  } else {
    forceSync = true;
    fs.writeFileSync(`${documentsDataPath}/${id}/labels.json`, '[]');
    labels = [];
  }
  const lastSync = forceSync ? 0 : config.lastSync || 0;

  request(`${apiURL}labels/sync?client=${id}&updatedAt_gte=${lastSync}`, {
    json: true,
    timeout: 7500
  }, (err, response, body) => {
    // console.log(response);
    if (err || !response) {
      resolve({
        err,
        labels,
        config
      });
      return;
    }
    config.lastSync = body.lastSync;
    config.client = client;
    labels = labels.filter(label => body.allLabels.some(item => item.toString() === label
      ._id.toString()));
    if (body.labels.length > 0) {
      body.labels.forEach(label => {
        const index = labels.findIndex(i => i._id === label._id.toString());
        if (index !== -1) labels.splice(index, 1);
      });

      labels = [...labels || [], ...body.labels];
    }
    const labelsJson = [...labels];
    const configJson = { ...config };
    labels = JSON.stringify(labels);
    config = JSON.stringify(config);
    body.uploads.forEach(upload => {
      request(`${apiURL}${upload.url}`, { encoding: null }, (error, resp, download) => {
        if (error) reject(error);
        const filename = upload.url;
        fs.writeFileSync(`${documentsDataPath}/${id}${filename}`, download, e => {
          if (e) {
            console.log(e);
            reject(e);
          }
          resolve(filename);
        });
      });
    });
    fs.writeFileSync(`${dataPath}/${id}/config.json`, config);
    fs.writeFileSync(`${documentsDataPath}/${id}/labels.json`, labels);


    resolve({
      labels: labelsJson,
      config: configJson
    });
  });
});
