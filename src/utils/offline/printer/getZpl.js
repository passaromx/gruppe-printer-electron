/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
const fs = require('fs');
const zplFormat = require('./zplFormat');

const startTrail = '^LS0';
const endTrail = '^PQ';

module.exports = async (filePath, format, params = {
  description: 'Variables',
  expireDate: '2018-01-01',
  productionDate: '2017-01-01',
  copies: 1
}) => new Promise(async (resolve, reject) => {
  try {
    const start = zplFormat(format, params);
    const end = `^PQ${params.copies},1,1,Y^XZ`;

    let zpl = await fs.readFileSync(`public/data/${params.client}${filePath}`, 'utf8');

    zpl = (zpl.split(startTrail))[1];

    zpl = (zpl.split(endTrail))[0];
    zpl = start + zpl + end;
    resolve(zpl);
  } catch (e) {
    reject(e);
  }
});
