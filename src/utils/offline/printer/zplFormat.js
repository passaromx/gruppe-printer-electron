/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
module.exports = (format, params) => {
  console.log(format);

  let start = '^XA';
  if (format === 1) {
    console.log('1', params);
    const { description, expireDate, productionDate } = params;
    start = `^XA
      ^MMC
      ^PW768
      ^LL1199
      ^LS0
      ^FT301,590^A0I,31,31^FH\^FD${description || ''}^FS
      ^FT301,680^A0I,31,31^FH\^FD${expireDate || ''}^FS
      ^FT301,765^A0I,31,31^FH\^FD${productionDate || ''}^FS^LS0`;
  } else if (format === 2) {
    console.log('2', params);
    const { description, weight, date } = params;
    start = `^XA
      ^MMC
      ^PW839
      ^LL1594
      ^LS0
      ^CFO,100
      ^FT125,1562^A@I,25,25,ARIALBOLD.FNT^FD${weight} KG^FS
      ^FT365,1523^A@I,33,33,ARIAL.FNT^FD${description}^FS

      ^FT8,311^A@R,19,19,ARIALBOLD.FNT^FD${date}^FS
      ^FT830,280^A@B,23,23,ARIALBOLD.FNT^FD${description}^FS^LS0`;
  }
  return start;
};
