const print = require('printer');
const util = require('util');

module.exports = async printer => {
  const { jobs } = print.getPrinter(printer);
  if (jobs.length > 0) {
    jobs.forEach(job => {
      if (job.status.indexOf('PRINTED') !== -1) {
        console.log('too late, already printed');
        return;
      }
      console.log('cancelling...');
      const cancel = printer.setJob(printer, job.id, 'CANCEL');
      console.log(`cancelled: ${cancel}`);
      try {
        console.log(`current job info:${util.inspect(printer.getJob(printer, job.id), {
          depth: 10,
          colors: true
        })}`);
      } catch (err) {
        console.log(`job deleted. err:${err}`);
      }
    });
  }
  // print.printDirect({
  //   data: '~JA',
  //   printer,
  //   type: 'RAW', // type: RAW, TEXT, PDF, JPEG, .. depends on platform
  //   success(jobID) {
  //     resolve(jobID);
  //   },
  //   error(err) { console.log(err); reject(err); }
  // });
};
