/* eslint-disable import/no-extraneous-dependencies */
import {
  app, protocol, BrowserWindow, ipcMain, dialog
} from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

const os = require('os');
const fs = require('fs');
// const PDFWindow = require('electron-pdf-window');
const { autoUpdater } = require('electron-updater');
const { sync } = require('./utils/offline/label');
const { printLabel } = require('./utils/offline/printer');
const { login } = require('./utils/offline/session');
const { arial, arialbold } = require('./utils/offline/printer/fonts');
autoUpdater.logger = require('electron-log');

autoUpdater.autoDownload = false;
// const log = require('electron-log');

autoUpdater.logger.transports.file.level = 'info';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
  // console.log(process.versions);
  // Create the browser window.
  win = new BrowserWindow({
    height: 700,
    width: 1000,
    minHeight: 700,
    minWidth: 1000
  });

  if (isDevelopment || process.env.IS_TEST) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html#login');
  }

  // console.log(os.networkInterfaces());
  // win.webContents.on('did-finish-load', () => {
  //   console.log('loaded', win.webContents.getPrinters());
  // });

  win.on('closed', () => {
    win = null;
  });
}

const hostname = os.hostname();
const networkIfaces = os.networkInterfaces();
ipcMain.on('get-system-info', e => {
  let result = Object.keys(networkIfaces).map(key => ({
    key,
    info: networkIfaces[key].filter(iface => (iface.mac !== '00:00:00:00:00:00'
      && iface.mac !== 'ff:ff:ff:ff:ff')
      && iface.family !== 'IPv6')
  }));
  result = result.filter(item => item.info.length);
  result = {
    hostname,
    mac: result[0].info[0].mac,
    network: result[0].key,
    // info: result[0].info[0]
  };
  e.sender.send('system-info-fetched', result);
});

ipcMain.on('check-mac', (e, info) => {
  let checks = false;
  const { mac, network } = info;
  if (networkIfaces[network]) {
    checks = networkIfaces[network].some(item => item.mac === mac);
  }

  e.sender.send('mac-checked', checks);
});

ipcMain.on('selected-label', (e, client, label) => {
  const userDataPath = app.getPath('userData');
  const labelPng = fs.readFileSync(`${userDataPath}/data/${client}/${label}`, { encoding: 'base64' });

  e.sender.send('image-ready', `data:image/jpeg;base64,${labelPng}`);
});

ipcMain.on('get-printers', e => {
  const printers = win.webContents.getPrinters();

  e.sender.send('printers-fetched', printers);
});

ipcMain.on('sync', (e, client, button) => {
  sync(client)
    .then(data => {
      e.sender.send('synced', data);
      if (data.err && button) e.sender.send('errorSync', data.err);
    })
    .catch(err => {
      e.sender.send('errorSync', err);
      console.log('err', err);
    });
});

ipcMain.on('login', (e, user, password, client, authenticate) => {
  login(user, password, client, authenticate)
    .then(data => {
      e.sender.send('logged', data);
    })
    .catch(err => {
      console.log('err', err);
      e.sender.send('wrongCredentials', err);
    });
});

// ipcMain.on('open-pdf', (e, url) => {
//   const pdfWindow = new BrowserWindow({
//     width: 500,
//     height: 800
//   });
//   pdfWindow.loadURL(`'app://./index.html#pdf-viewer?'${url}`);
//   // we
// });

// ipcMain.on('getZpl', (e, label, data) => {
//   const { getZpl, getPreview } = require('./utils/offline/printer');
//   getZpl(label.label.url, data)
//     .then(zpl => {
//       e.sender.send('zplReady', zpl);
//       getPreview(zpl)
//         .then(renderLabel => {
//           e.sender.send('label', renderLabel);
//         })
//         .catch(err => {
//           const renderLabel =
//           e.sender.send('label', `data:image/jpeg;base64,${renderLabel}`);
//           console.log(err);
//         });
//     })
//     .catch(err => console.log(err));
// });

ipcMain.on('print', (e, printer, label, data, format) => {
  const { getZpl } = require('./utils/offline/printer');
  getZpl(label.label.url, format, data)
    .then(zpl => {
      printLabel(printer, zpl)
        .then(printed => console.log(printed))
        .catch(err => console.log(err));
    });
});

ipcMain.on('update-fonts', (e, printer) => {
  const fonts = arial + arialbold;
  printLabel(printer, fonts)
    .then(printed => console.log(printed))
    .catch(err => console.log(err));
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // log.info('app is ready!')
  createWindow();
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  } else {
    setTimeout(autoUpdater.checkForUpdates(), 2000);
  }
});

autoUpdater.on('update-available', () => {
  // Prompt user to update
  dialog.showMessageBox({
    type: 'info',
    title: 'Update Available',
    message: 'A new version of Readit is available. Do you want to update now?',
    buttons: ['Update', 'No']
  }, buttonIndex => {
    // If not 'Update' button, return
    if (buttonIndex !== 0) return;

    // Else start download and show download progress in new window
    autoUpdater.downloadUpdate();

    autoUpdater.on('update-downloaded', () => {
      // Prompt user to quit and install update
      dialog.showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: 'A new version of Readit is ready. Quit and install now?',
        buttons: ['Yes', 'Later']
      }, buttonIndexx => {
        // Update if 'Yes'
        if (buttonIndexx === 0) autoUpdater.quitAndInstall();
      });
    });
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
