/* eslint-disable import/no-extraneous-dependencies */
const electron = require('electron');
const path = require('path');
const fs = require('fs');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const dataPath = path.join(userDataPath, 'data');

module.exports = async (username, password, user, jwt, authenticate) => new Promise((resolve, reject) => {
  let config;
  let session;
  try {
    config = fs.existsSync(`${dataPath}/config.json`);
    session = fs.existsSync(`${dataPath}/session.json`);
    if (!config) {
      fs.writeFileSync(`${dataPath}/config.json`, '{}');
    }
    if (!session) {
      fs.writeFileSync(`${dataPath}/session.json`, '[{}]');
    }
    session = JSON.parse(fs.readFileSync(`${dataPath}/session.json`, 'utf8'));
    config = JSON.parse(fs.readFileSync(`${dataPath}/config.json`, 'utf8'));
  } catch (e) {
    reject(e);
  }

  let index = -1;
  if (session.length > 0) {
    session.forEach((sess, i) => {
      if (sess.username === username) index = i;
    });
  }
  if (session[index] && session[index].hash && authenticate) {
    const pass = Buffer.from(`${session[index].hash}`, 'base64').toString('ascii');
    const validPass = `$passaro$${password}$passaro$` === pass;

    if (validPass && username === session[index].username) {
      resolve({
        config,
        session: session[index]
      });
    } else {
      const err = new Error(401);
      reject(err);
    }
  } else if (!authenticate && !['admin', 'admin@gruppesolutions.com.mx'].includes(username)) {
    const hash = Buffer.from(`$passaro$${password}$passaro$`).toString('base64');
    if (index === -1) {
      index = session.length;
      session.push({});
    }
    session[index].hash = hash;
    session[index].user = user;
    session[index].username = username;
    session[index].jwt = jwt;
    config.client = user ? user.client : config.client;
    config.settings = user ? user.client.settings : config.settings;
    const sessionjson = JSON.stringify(session);
    const configjson = JSON.stringify(config);
    fs.writeFileSync(`${dataPath}/session.json`, sessionjson);
    fs.writeFileSync(`${dataPath}/config.json`, configjson);
    resolve({
      config,
      session: session[index]
    });
  } else if (['admin', 'admin@gruppesolutions.com.mx'].includes(username)) {
    resolve({ admin: true });
  } else {
    const err = new Error(404);
    reject(err);
  }
});
