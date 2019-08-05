/* eslint-disable import/no-extraneous-dependencies */
const request = require('request');
// const rp = require('request-promise');
const electron = require('electron');
const path = require('path');
const axios = require('axios');

const fs = require('fs');
const { apiURL } = require('../../../api/constants');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const documentsPath = (electron.app || electron.remote.app).getPath('documents');

/* eslint-disable-next-line */
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

    async function downloadFile(file) {
      const { url } = file;
      const downloadPath = url.includes('http')
        ? `${documentsDataPath}/${id}/uploads/${url.split('com/')[1]}`
        : `${documentsDataPath}/${id}${url}`;

      console.log(downloadPath);

      try {
        const downloadRes = await axios({
          method: 'GET',
          url: url.includes('http') ? url : `http://3.81.203.178:1337${url}`,
          timeout: 5000,
          responseType: 'stream'
        });

        downloadRes.data.pipe(fs.createWriteStream(downloadPath));

        return new Promise((res, rej) => {
          downloadRes.data.on('end', () => {
            console.log('downloaded');
            res();
          });
          downloadRes.data.on('error', error => {
            console.log('download error', error);
            rej(error);
          });
        });
      } catch (error) {
        console.log('file not Found');
        return null;
      }
    }


    async function processUploads(uploads) {
      /* eslint-disable-next-line */
      for (const upload of uploads) {
        console.log('start');
        /* eslint-disable-next-line */
        await downloadFile(upload);
      }

      resolve({
        labels: labelsJson,
        config: configJson
      });
    }

    function missingFiles(items) {
      const filesPath = `${documentsDataPath}/${id}`;
      const missing = [];
      items.forEach(item => {
        const { label, labelPng, labelPdf } = item;

        try {
          const prn = label ? label.url.split('/')[label.url.includes('amazon') ? 3 : 2] : null;
          const png = labelPng ? labelPng.url.split('/')[labelPng.url.includes('amazon') ? 3 : 2] : null;
          const pdf = labelPdf ? labelPdf.url.split('/')[labelPdf.url.includes('amazon') ? 3 : 2] : null;
          // console.log(prn);
          if (prn && !fs.existsSync(`${filesPath}/uploads/${prn}`)) missing.push(label);
          if (png && !fs.existsSync(`${filesPath}/uploads/${png}`)) missing.push(labelPng);
          if (pdf && !fs.existsSync(`${filesPath}/uploads/${pdf}`)) missing.push(labelPdf);
        } catch (e) {
          console.log(e);
        }
      });

      return missing;
    }

    fs.writeFileSync(`${dataPath}/${id}/config.json`, config);
    fs.writeFileSync(`${documentsDataPath}/${id}/labels.json`, labels);

    const downloads = lastSync > 0 ? [...body.uploads, ...missingFiles(labelsJson)] : [...body.uploads];

    console.log('downloads', downloads.length);

    // downloadFile(body.uploads[0]).then(() => {
    //   console.log('file downloaded');
    // });

    if (downloads.length > 0) {
      processUploads(downloads);
    } else {
      resolve({
        labels: labelsJson,
        config: configJson
      });
    }
  });
});
