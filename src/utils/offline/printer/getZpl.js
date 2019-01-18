/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
const fs = require('fs');

const startTrail = '^LS0';
const endTrail = '^PQ';

module.exports = async (filePath, data = {
  description: 'Variables',
  expireDate: '2018-01-01',
  productionDate: '2017-01-01',
  copies: 1
}) => new Promise(async (resolve, reject) => {
  try {
    const {
      description, expireDate, productionDate, copies, client
    } = data;
    const start = `^XA
      ^MMC
      ^PW768
      ^LL1199
      ^LS0
      ^FT301,590^A0I,31,31^FH\^FD${description || ''}^FS
      ^FT301,680^A0I,31,31^FH\^FD${expireDate || ''}^FS
      ^FT301,765^A0I,31,31^FH\^FD${productionDate || ''}^FS${startTrail}`;

    const end = `^PQ${copies},1,1,Y^XZ`;

    let zpl = await fs.readFileSync(`public/data/${client}${filePath}`, 'utf8');

    zpl = (zpl.split(startTrail))[1];

    zpl = (zpl.split(endTrail))[0];
    zpl = start + zpl + end;
    resolve(zpl);
  } catch (e) {
    reject(e);
  }
});
