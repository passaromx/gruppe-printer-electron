/* eslint-disable import/no-extraneous-dependencies */
const request = require('request');
const electron = require('electron');
const path = require('path');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');

module.exports = client => new Promise((resolve, reject) => {
  const id = client._id;
  const dataPath = path.join(userDataPath, 'data');
  const dataPathExists = fs.existsSync(`${dataPath}`);
  if (!dataPathExists) {
    fs.mkdirSync(path.join(userDataPath, 'data'), { recursive: true });
  }
  const clientExists = fs.existsSync(`${dataPath}/${id}`);
  if (!clientExists) {
    fs.mkdirSync(`${dataPath}/${id}`, { recursive: true });
    fs.mkdirSync(`${dataPath}/${id}/uploads`, { recursive: true });
  }

  let config = fs.existsSync(`${dataPath}/${id}/config.json`);
  if (config) {
    config = JSON.parse(fs.readFileSync(`${dataPath}/${id}/config.json`, 'utf8'));
  } else {
    fs.writeFileSync(`${dataPath}/${id}/config.json`, '{}');
    config = {};
  }


  let labels = fs.existsSync(`${dataPath}/${id}/labels.json`);
  if (labels) {
    labels = JSON.parse(fs.readFileSync(`${dataPath}/${id}/labels.json`, 'utf8'));
  } else {
    fs.writeFileSync(`${dataPath}/${id}/labels.json`, '[]');
    labels = [];
  }

  const lastSync = config.lastSync || 0;
  request(`${apiURL}labels/sync?client=${id}&updatedAt_gte=${lastSync}`, {
    json: true,
    timeout: 3500
  }, (err, response, body) => {
    if (err || !body.allLabels) {
      resolve({
        err: err || new Error('no labels'),
        labels,
        config
      });
      return;
    }
    config.lastSync = body.lastSync;
    config.client = client;
    labels = labels.filter(label => body.allLabels.some(item => item.toString() === label._id.toString()));

    if (body.labels.length > 0) labels = [...labels || [], ...body.labels];
    const labelsJson = [...labels];
    const configJson = { ...config };
    labels = JSON.stringify(labels);
    config = JSON.stringify(config);
    body.uploads.forEach(upload => {
      request(`${apiURL}${upload.url}`, { encoding: null }, (error, resp, download) => {
        if (error) reject(error);
        const filename = upload.url;
        fs.writeFileSync(`${dataPath}/${id}${filename}`, download, e => {
          if (e) {
            console.log(e);
            reject(e);
          }
          resolve(filename);
        });
      });
    });
    fs.writeFileSync(`${dataPath}/${id}/config.json`, config);
    fs.writeFileSync(`${dataPath}/${id}/labels.json`, labels);


    resolve({
      labels: labelsJson,
      config: configJson
    });
  });
});
