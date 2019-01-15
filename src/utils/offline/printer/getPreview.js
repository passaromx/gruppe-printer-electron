const request = require('request');

module.exports = zpl => new Promise((resolve, reject) => {
  const options = {
    url: 'http://api.labelary.com/v1/printers/8dpmm/labels/4.25x6/0/',
    headers: { 'X-Rotation': 180 },
    encoding: null,
    formData: { file: zpl },
  };

  request.post(options, (error, response, body) => {
    if (error || !response) {
      reject(error);
    } else {
      resolve(`data:image/jpeg;base64,${body.toString('base64')}`);
    }
  });
});
