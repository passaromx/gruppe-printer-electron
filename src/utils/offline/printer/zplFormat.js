/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
const moment = require('moment');

module.exports = (settings, params) => {
  const { format, labelShift } = settings;
  // console.log(format);

  let start = '^XA';
  if (format === 'myn') {
    console.log('1', params);
    const { description, productionDate, expiryDays } = params;

    const formattedExpiry = expiryDays ? moment(productionDate).add(expiryDays, 'days').format('DD-MM-YYYY') : '';

    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1279
      ^LS0
      ^FT310,870^A0I,44,44^FH\^FD${description || ''}^FS
      ^FT350,790^A0I,43,43^FH\^FD${moment(productionDate).format('DD-MM-YYYY') || ''}^FS^LS0
      ^FT350,710^A0I,43,43^FH\^FD${formattedExpiry}^FS^LS0`;
  } else if (format === 'malta') {
    // console.log('2', params);
    const {
      description, weight, date, isMock, uid
    } = params;
    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1615
      ^LS0
      ^CFO,100
      ^FT100,1545^A@I,25,25,ARIALBOLD.FNT^FD${weight} KG^FS`;
    if (!isMock) {
      // console.log('format uid', uid);
      start = `
      ${start}
      ^FT385,1510^A@I,30,30,ARIAL.FNT^FD${description}^FS
      ^FT6,420^A@R,19,19,ARIALBOLD.FNT^FD${date}^FS
      ^FT810,340^A@B,23,23,ARIALBOLD.FNT^FD${description}^FS^LS0`;
    }
    if (uid) {
      start = `${start}
      ^FT820,1420^A@B,23,23,ARIAL.FNT^FD${uid}^FS^LS0`;
    }
  } else if (format === 'wisium') {
    console.log('3', params);
    const { description } = params;
    start = `^XA
      ^MMT
      ^LH${labelShift || '0'},0
      ^PW831
      ^LL1319
      ^LS0
      ^CFO,100
      ^FT200,1200^A@,25,25,ARIAL.FNT^FD${description}^FS`;
  } else if (format === 'maltaExport') {
    const { description, date } = params;

    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1615
      ^LS0
      ^FT380,70^A@I,30,30,ARIALBOLD.FNT^FD${description}^FS
      ^FT805,30^A@I,38,38,ARIALBOLD.FNT^FD${date}^FS`;
  }
  return start;
};
