
const request = require('request');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

module.exports = client => new Promise((resolve, reject) => {
  let config = JSON.parse(fs.readFileSync('src/data/config.json', 'utf8'));
  let labels = JSON.parse(fs.readFileSync('src/data/labels.json', 'utf8'));

  const { lastSync } = config;
  request(`${apiURL}labels/sync?client=${client}&updatedAt_gte=${lastSync}`, { json: true }, (err, response, body) => {
    if (err || !body) reject(err);
    config.lastSync = body.lastSync;
    if (body.labels.length > 0) labels = [...labels, ...body.labels];
    const labelsJson = [...labels];
    labels = JSON.stringify(labels);
    config = JSON.stringify(config);
    body.uploads.forEach(upload => {
      console.log(upload.url);
      request(`${apiURL}${upload.url}`, { encoding: null }, (error, resp, download) => {
        if (error) reject(error);
        const filename = upload.url;
        fs.writeFileSync(`src/data${filename}`, download, e => {
          if (e) {
            console.log(e);
            reject(e);
          }
          resolve(filename);
        });
      });
    });
    fs.writeFileSync('src/data/config.json', config);
    fs.writeFileSync('src/data/labels.json', labels);


    resolve(labelsJson);
  });
});
