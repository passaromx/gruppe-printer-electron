/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */

const moment = require('moment');

module.exports = (settings, params) => {
  const { format, labelShift } = settings;

  let start = '^XA';
  if (format === 'myn') {
    const { description, productionDate, expiryDays, isMock } = params;

    const formattedExpiry = expiryDays ? moment(productionDate).add(expiryDays, 'days').format('DD-MM-YYYY') : '';

    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1279
      ^LS0
      ^FT335,870^A0I,44,44^FH\^FD${description || ''}^FS`;
    if (!isMock) {
      start = `${start}
      ^FT350,790^A0I,43,43^FH\^FD${moment(productionDate).format('DD-MM-YYYY') || ''}^FS^LS0
      ^FT350,710^A0I,43,43^FH\^FD${formattedExpiry}^FS^LS0`;
    }
  } else if (format === 'malta') {
    const { description, weight, date, isMock, isEmpty } = params;
    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1615
      ^LS0
      ^CFO,100
      ^FT100,1545^A@I,25,25,ARIALBOLD.FNT^FD${weight} KG^FS`;
    if (isEmpty) {
      
    } else {
      if (!isMock || isMock) {
        start = `
        ${start}
        ^FT385,1510^A@I,30,30,ARIAL.FNT^FD${description}^FS
        ^FT6,420^A@R,19,19,ARIALBOLD.FNT^FD${date}^FS
        ^FT810,340^A@B,23,23,ARIALBOLD.FNT^FD${description}^FS^LS0`;
      }
    }
    
    // if (uid) {
    //   start = `${start}
    //   ^FT820,1420^A@B,23,23,ARIAL.FNT^FD${uid}^FS^LS0`;
    // }
  } else if (format === 'maltaBarcode') {
    const {
      description,
      weight,
      date,
      isMock,
      line,
      shift,
      group,
      factory,
      sku
    } = params;
    const barcode = `${sku}-${factory}-${moment(date).format('DDMMYY')}-${shift}-${line}-${group}`;
    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1758
      ^LS0
      ^CFO,100
      ^FT100,1625^A@I,25,25,ARIALBOLD.FNT^FD${weight} KG^FS`;
    if (!isMock || isMock) {
      start = `
      ${start}
      ^FT385,1590^A@I,30,30,ARIAL.FNT^FD${description}^FS
      ^FT6,500^A@R,19,19,ARIALBOLD.FNT^FD${date}^FS
      ^FT810,420^A@B,23,23,ARIALBOLD.FNT^FD${description}^FS^LS0
      ^BY2,2,50
      ^FO@80,35^BCI^FD${barcode}^FS
      ^BY2,2,50
      ^FO@80,1700^BCI^FD${barcode}^FS`;
    }
  } else if (format === 'maltaPets') {
    const { description, date, weight, isMock } = params;

    start = `^XA
    ^LH${labelShift || '0'},0
    ^MMC
    ^PW832
    ^LL1615
    ^LS0
    ^CFO,100
    ^FT100,1545^A@I,25,25,ARIALBOLD.FNT^FD${weight} KG^FS`;
    if (!isMock || isMock) {
      start = `
      ${start}
      ^FT385,1510^A@I,30,30,ARIAL.FNT^FD${description}^FS
      ^FT700,1360^A@I,100,100,ARIALBOLD.FNT^FD${moment(date).format('DD/MM/YYYY')}^FS
      ^FT810,340^A@B,23,23,ARIALBOLD.FNT^FD${description}^FS^LS0`;
    }
  } else if (format === 'wisium') {
    const { invert } = settings;
    const { description, productionDate, expiryDays } = params;

    const formattedExpiry = expiryDays ? moment(productionDate).add(expiryDays, 'days').format('MM-YYYY') : '';
    start = `^XA
      ^MMT
      ^LH${labelShift || '0'},0
      ^PW831
      ^LL1319
      ^LS0
      ^CFO,100`;

    if (invert) {
      start = `${start} 
        ^FT200,1200^A@,25,25,ARIAL.FNT^FD${description}^FS
        ^FT290,1240^A0,30,30^FH\^FD${formattedExpiry}^FS^LS0`;
    } else { // not rotated settings
      start = `${start} 
        ^FT580,115^A@I,25,25,ARIAL.FNT^FD${description}^FS
        ^FT500,80^A0I,30,30^FH\^FD${formattedExpiry}^FS^LS0`;
    }
  } else if (format === 'wisiumh') {
    const { invert } = settings;
    const { description, date, productionDate } = params;
    start = `^XA
      ^MMT
      ^LH${labelShift || '0'},0
      ^PW831
      ^LL1319
      ^LS0
      ^CFO,100`;

    if (invert) {
      start = `${start}
        ^FT300,650^A@,80,80,ARIALBOLD.FNT^FD${description}^FS
        ^FT250,550^A@,80,80,ARIALBOLD.FNT^FD${date}^FS
        ^FT350,450^A@,80,80,ARIALBOLD.FNT^FD${productionDate}^FS`;
    } else { // not rotated settings
      start = `${start} 
        ^FT675,650^A@I,100,100,ARIALBOLD.FNT^FD${description}^FS
        ^FT525,550^A@I,110,110,ARIALBOLD.FNT^FD${date}^FS
        ^FT735,450^A@I,80,80,ARIALBOLD.FNT^FD${productionDate}^FS`;
    }
  } else if (format === 'wisiumv') {
    const { invert } = settings;
    const { description, date } = params;
    start = `^XA
      ^MMT
      ^LH${labelShift || '0'},0
      ^PW831
      ^LL1319
      ^LS0
      ^CFO,100`;

    if (invert) {
      start = `${start} 
        ^FT500,70^A@R,180,180,ARIALBOLD.FNT^FD${description}^FS
        ^FT330,320^A@R,200,200,ARIALBOLD.FNT^FD${date}^FS`;
    } else { // not rotated settings
      start = `${start} 
      ^FT470,310^A@R,170,170,ARIALBOLD.FNT^FD${description}^FS
      ^FT300,590^A@R,200,200,ARIALBOLD.FNT^FD${date}^FS`;
    }
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
  } else if (format === 'micros') {
    const { productionDate, weight, shift, smallWeight } = params;
    start = `
      ^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW862
      ^LL2557
      ^LS0
      ^FT350,2140^A@B,150,150,ARIAL.FNT^FD${weight}^FS
      ^FT520,2280^A@B,150,150,ARIAL.FNT^FD${moment(productionDate).format('DD/MM/YYYY')}^FS
      ^FT520,1080^A@B,150,150,ARIAL.FNT^FD${shift}^FS
      ^FT820,2530^A@B,60,60,ARIAL.FNT^FD${smallWeight.toUpperCase()}^FS
    `;
  }
  return start;
};
