
const request = require('request');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

module.exports = client => new Promise((resolve, reject) => {
  const id = client._id;
  const clientExists = fs.existsSync(`src/data/${id}`);
  if (!clientExists) {
    fs.mkdirSync(`src/data/${id}`, { recursive: true });
    fs.mkdirSync(`src/data/${id}/uploads`, { recursive: true });
  }


  let config = fs.existsSync(`src/data/${id}/config.json`);
  if (config) {
    config = JSON.parse(fs.readFileSync(`src/data/${id}/config.json`, 'utf8'));
  } else {
    fs.writeFileSync(`src/data/${id}/config.json`, '{}');
    config = {};
  }


  let labels = fs.existsSync(`src/data/${id}/labels.json`);
  if (labels) {
    labels = JSON.parse(fs.readFileSync(`src/data/${id}/labels.json`, 'utf8'));
  } else {
    fs.writeFileSync(`src/data/${id}/labels.json`, '[]');
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
        fs.writeFileSync(`src/data/${id}${filename}`, download, e => {
          if (e) {
            console.log(e);
            reject(e);
          }
          resolve(filename);
        });
      });
    });
    fs.writeFileSync(`src/data/${id}/config.json`, config);
    fs.writeFileSync(`src/data/${id}/labels.json`, labels);


    resolve({
      labels: labelsJson,
      config: configJson
    });
  });
});
