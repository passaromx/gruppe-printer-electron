/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
const fs = require('fs');

const startTrail = '^LS0';
const endTrail = '^XZ';

module.exports = async (filePath, data = {
  nomenclature: '',
  date: '',
  copies: 1
}) => new Promise(async (resolve, reject) => {
  try {
    const { nomenclature, date, copies } = data;
    const start = `^XA
      ^MMC
      ^PW831
      ^LL1574
      ^LS0
      ^FT365,1520^A0I,31,31^FH\^FD${nomenclature}^FS
      ^FT8,311^A0R,20,21^FH\^FD${date}^FS
      ^FT810,165^A0R,15,15^FPH\^FD${nomenclature}^FS${startTrail}`;

    const end = `^PQ${copies},1,1,Y${endTrail}`;

    let zpl = await fs.readFileSync(`src/data${filePath}`, 'utf8');

    zpl = (zpl.split(startTrail))[1];

    zpl = (zpl.split(endTrail))[0];
    zpl = start + zpl + end;
    resolve(zpl);
  } catch (e) {
    reject(e);
  }
});
