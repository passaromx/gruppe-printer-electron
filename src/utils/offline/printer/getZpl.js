/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const electron = require('electron');
const path = require('path');

const userDataPath = (electron.app || electron.remote.app).getPath('documents');

module.exports = async (file, params) => {
  const startTrail = '^LS0';
  const endTrail = '^PQ';

  try {
    const dataPath = path.join(userDataPath, 'gruppe');
    const filePath = file.includes('amazon') ? `/uploads/${file.split('com/')[1]}` : file;
    let zpl = await fs.readFileSync(`${dataPath}/${params.client}${filePath}`, 'utf8');
    zpl = (zpl.split(startTrail))[1];
    zpl = (zpl.split(endTrail))[0];

    return zpl;
  } catch (error) {
    console.log(error);
    return null;
  }
};
