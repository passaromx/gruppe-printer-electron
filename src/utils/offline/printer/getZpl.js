/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const electron = require('electron');
const path = require('path');
const zplFormat = require('./zplFormat');

const startTrail = '^LS0';
const endTrail = '^PQ';
const userDataPath = (electron.app || electron.remote.app).getPath('documents');
module.exports = async (file, settings, params = {
  description: 'Variables',
  expireDate: '2018-01-01',
  productionDate: '2017-01-01',
  copies: 1
}) => new Promise(async (resolve, reject) => {
  try {
    const dataPath = path.join(userDataPath, 'gruppe');
    const start = zplFormat(settings, params);
    const end = `^PQ${params.copies},1,1,Y^XZ`;

    const filePath = file.includes('amazon') ? `/uploads/${file.split('com/')[1]}` : file;
    let zpl = await fs.readFileSync(`${dataPath}/${params.client}${filePath}`, 'utf8');

    zpl = (zpl.split(startTrail))[1];

    zpl = (zpl.split(endTrail))[0];
    zpl = start + zpl + end;
    resolve(zpl);
  } catch (e) {
    reject(e);
  }
});
