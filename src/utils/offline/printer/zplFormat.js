/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
module.exports = (settings, params) => {
  const { format, labelShift } = settings;
  console.log(format);

  let start = '^XA';
  if (format === 'myn') {
    console.log('1', params);
    const { description, productionDate } = params;
    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW799
      ^LL1279
      ^LS0
      ^FT280,680^A0I,37,37^FH\^FD${description || ''}^FS
      ^FT280,850^A0I,31,31^FH\^FD${productionDate || ''}^FS^LS0`;
  } else if (format === 'malta') {
    console.log('2', params);
    const { description, weight, date } = params;
    start = `^XA
      ^LH${labelShift || '0'},0
      ^MMC
      ^PW832
      ^LL1615
      ^LS0
      ^CFO,100
      ^FT125,1562^A@I,25,25,ARIALBOLD.FNT^FD${weight} KG^FS
      ^FT395,1523^A@I,30,30,ARIAL.FNT^FD${description}^FS

      ^FT8,311^A@R,19,19,ARIALBOLD.FNT^FD${date}^FS
      ^FT830,340^A@B,23,23,ARIALBOLD.FNT^FD${description}^FS^LS0`;
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
  }
  return start;
};
