
const request = require('request');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

module.exports = client => new Promise((resolve, reject) => {
  const id = client._id;
  const clientExists = fs.existsSync(`public/data/${id}`);
  if (!clientExists) {
    fs.mkdirSync(`public/data/${id}`, { recursive: true });
    fs.mkdirSync(`public/data/${id}/uploads`, { recursive: true });
  }


  let config = fs.existsSync(`public/data/${id}/config.json`);
  if (config) {
    config = JSON.parse(fs.readFileSync(`public/data/${id}/config.json`, 'utf8'));
  } else {
    fs.writeFileSync(`public/data/${id}/config.json`, '{}');
    config = {};
  }


  let labels = fs.existsSync(`public/data/${id}/labels.json`);
  if (labels) {
    labels = JSON.parse(fs.readFileSync(`public/data/${id}/labels.json`, 'utf8'));
  } else {
    fs.writeFileSync(`public/data/${id}/labels.json`, '[]');
    labels = [];
  }

  const lastSync = config.lastSync || 0;
  request(`${apiURL}labels/sync?client=${id}&updatedAt_gte=${lastSync}`, { json: true }, (err, response, body) => {
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
        fs.writeFileSync(`public/data/${id}${filename}`, download, e => {
          if (e) {
            console.log(e);
            reject(e);
          }
          resolve(filename);
        });
      });
    });
    fs.writeFileSync(`public/data/${id}/config.json`, config);
    fs.writeFileSync(`public/data/${id}/labels.json`, labels);


    resolve({
      labels: labelsJson,
      config: configJson
    });
  });
});
