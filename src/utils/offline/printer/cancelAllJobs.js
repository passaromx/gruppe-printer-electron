const print = require('printer');

module.exports = async printer => new Promise((resolve, reject) => {
  print.printDirect({
    data: '~JA',
    printer,
    type: 'RAW', // type: RAW, TEXT, PDF, JPEG, .. depends on platform
    success(jobID) {
      resolve(jobID);
    },
    error(err) { console.log(err); reject(err); }
  });
});
