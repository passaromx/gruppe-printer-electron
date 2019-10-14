const print = require('printer');
// const util = require('util');

module.exports = async printer => {
  const { jobs } = print.getPrinter(printer);
  if (jobs && jobs.length > 0) {
    // console.log(jobs.length);
    jobs.forEach(job => {
      if (job.status.indexOf('PRINTED') !== -1) {
        // console.log('too late, already printed');
        return;
      }
      console.log('cancelling...', job.id);
      const cancel = print.setJob(printer, job.id, 'CANCEL');
      console.log(`cancelled: ${cancel}`);
      // try {
      //   console.log(`current job info:${util.inspect(print.getJob(printer, job.id), {
      //     depth: 10,
      //     colors: true
      //   })}`);
      // } catch (err) {
      //   console.log(`job deleted. err:${err}`);
      // }
    });
  }
};
