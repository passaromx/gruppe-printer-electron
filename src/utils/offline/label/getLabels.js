module.exports = () => new Promise(resolve => {
  const labels = require('../../../data/labels.json');
  resolve(labels);
});
