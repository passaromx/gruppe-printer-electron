/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
module.exports = (format, params) => {
  console.log(format);

  let start = '^XA';
  if (format === 'myn') {
    console.log('1', params);
    const { description, expireDate, productionDate } = params;
    start = `^XA
      ^MMC
      ^PW832
      ^LL1199
      ^LS0
      ^FT260,585^A0I,37,37^FH\^FD${description || ''}^FS
      ^FT301,680^A0I,31,31^FH\^FD${expireDate || ''}^FS
      ^FT270,760^A0I,31,31^FH\^FD${productionDate || ''}^FS^LS0`;
  } else if (format === 'malta') {
    console.log('2', params);
    const { description, weight, date } = params;
    start = `^XA
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
      ^MMC
      ^PW831
      ^LL1319
      ^LS15
      ^CFO,100
      ^FT200,1200^A@,25,25,ARIAL.FNT^FD${description}^FS`;
  }
  return start;
};
