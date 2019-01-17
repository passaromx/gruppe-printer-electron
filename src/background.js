/* eslint-disable import/no-extraneous-dependencies */
import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

const { sync } = require('./utils/offline/label');
const { printLabel } = require('./utils/offline/printer');
const { login } = require('./utils/offline/session');


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

  // win.webContents.on('did-finish-load', () => {
  //   console.log('loaded', win.webContents.getPrinters());
  // });

  win.on('closed', () => {
    win = null;
  });
}

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
      console.log(data);
      e.sender.send('logged', data);
    })
    .catch(err => {
      console.log('err', err);
      e.sender.send('wrongCredentials', err);
    });
});

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
//           const renderLabel = fs.readFileSync(`src/data${label.labelPng.url}`, { encoding: 'base64' });
//           e.sender.send('label', `data:image/jpeg;base64,${renderLabel}`);
//           console.log(err);
//         });
//     })
//     .catch(err => console.log(err));
// });

ipcMain.on('print', (e, printer, label, data) => {
  const { getZpl } = require('./utils/offline/printer');
  getZpl(label.label.url, data)
    .then(zpl => {
      printLabel(printer, zpl)
        .then(printed => console.log(printed))
        .catch(err => console.log(err));
    });
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
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  createWindow();
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
