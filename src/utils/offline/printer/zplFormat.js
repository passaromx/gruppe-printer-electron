/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
module.exports = (format, params) => {
  let start = '^XA';
  if (format === 1) {
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
    const { description, date } = params;
    start = `^XA
      ^MMC
      ^PW831
      ^LL1574
      ^LS0
      ^FT365,1520^A0I,31,31^FH\^FD${description}^FS
      ^FT8,311^A0R,20,21^FH\^FD${date}^FS
      ^FT810,165^A0R,15,15^FPH\^FD${description}^FS^LS0`;
  }
  return start;
};
