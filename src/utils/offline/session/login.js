// // const bcrypt = require('bcrypt');
// const fs = require('fs');

// const saltRounds = 10;

// module.exports = async (user, password, userData, authenticate) => {
//   console.log('offline login', user, password, userData, authenticate);
//   let session = JSON.parse(fs.readFileSync('src/data/session.json', 'utf8'));
//   let config = JSON.parse(fs.readFileSync('src/data/config.json', 'utf8'));
//   return new Promise((resolve, reject) => {
//     if (session.hash && authenticate) {
//       const validPass = bcrypt.compareSync(password, session.hash);
//       if (validPass && user === session.user) {
//         resolve({
//           config,
//           session
//         });
//       } else {
//         const err = new Error('wrong credentials');
//         reject(err);
//       }
//     } else if (!authenticate) {
//       const hash = bcrypt.hashSync(password, saltRounds);
//       session.hash = hash;
//       session.user = user;
//       session.userData = userData;
//       config.settings = userData ? userData.client.settings : config.settings;
//       session = JSON.stringify(session);
//       config = JSON.stringify(config);
//       fs.writeFileSync('src/data/session.json', session);
//       fs.writeFileSync('src/data/config.json', config);
//       resolve(true);
//     } else {
//       const err = new Error('no offline credentials');
//       reject(err);
//     }
//   });
// };
