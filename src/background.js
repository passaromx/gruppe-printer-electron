/* eslint-disable import/no-extraneous-dependencies */
import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  dialog,
  // shell, remote
} from 'electron';
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';

const path = require('path');
const print = require('printer');
const os = require('os');
const fs = require('fs');
// const printer = require('printer');
// const PDFWindow = require('electron-pdf-window');
const { autoUpdater } = require('electron-updater');
// const { apiURL } = require('./api/constants');
const { sync } = require('./utils/offline/label');
const { printLabel } = require('./utils/offline/printer');
const { login } = require('./utils/offline/session');
const {
  arial,
  arialbold
} = require('./utils/offline/printer/fonts');
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
    height: 800,
    width: 1200,
    minHeight: 600,
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
    mac: result.length > 0 ? result[0].info[0].mac : null,
    network: result.length > 0 ? result[0].key : null,
    // info: result[0].info[0]
  };
  e.sender.send('system-info-fetched', result);
});

ipcMain.on('view-pdf', (e, client, file) => {
  // console.log('view pdf called', client, file);
  let documentsPath = app.getPath('documents');
  documentsPath = path.join(documentsPath, 'gruppe');
  const url = `file://${documentsPath}/${client}/${file}`;
  if (url.includes('.pdf')) {
    // console.log('pdf', url);
    e.sender.send('url-ready', url);
    // shell.openExternal(url);
  } else {
    // console.log('nopdf', url);
    let newWin = new BrowserWindow({
      width: 500,
      height: 800,
      webPreferences: { plugins: true }
    });
    newWin.loadURL(url);
    newWin.setMenu(null);
    newWin.on('closed', () => {
      newWin = null;
    });
  }
});

ipcMain.on('check-mac', (e, info) => {
  let checks = false;
  const {
    mac,
    network
  } = info;
  if (networkIfaces[network]) {
    checks = networkIfaces[network].some(item => item.mac === mac);
  }

  e.sender.send('mac-checked', checks);
});

ipcMain.on('selected-label', (e, client, label) => {
  const userDataPath = app.getPath('documents');
  if (fs.existsSync(`${userDataPath}/gruppe/${client}/${label}`)) {
    const labelPng = fs.readFileSync(`${userDataPath}/gruppe/${client}/${label}`, { encoding: 'base64' });

    e.sender.send('image-ready', `data:image/jpeg;base64,${labelPng}`);
  } else {
    // e.sender.send('image-ready', `${apiURL}${label}`);
    e.sender.send('image-ready', '');
  }
});

ipcMain.on('get-printers', e => {
  const printers = win.webContents.getPrinters();
  // const printers = printer.getPrinters();
  // console.log(process.versions);
  // console.log(printer.getPrinter('ZDesigner 105SLPlus-203dpi ZPL'))
  // console.log(printers);
  e.sender.send('printers-fetched', printers);
});

ipcMain.on('sync', (e, client) => {
  sync(client)
    .then(data => {
      // console.log(data);
      e.sender.send('synced', data);
      if (data.err) e.sender.send('errorSync', data.err);
    })
    .catch(err => {
      e.sender.send('errorSync', err);
    });
});

ipcMain.on('login', (e, username, password, user, jwt, authenticate) => {
  login(username, password, user, jwt, authenticate)
    .then(data => {
      e.sender.send('logged', data);
    })
    .catch(err => {
      const error = { response: { status: parseInt(err.message, 10) } };
      e.sender.send('wrongCredentials', error);
    });
});

ipcMain.on('print', (e, printer, label, data, settings) => {
  const { getZpl } = require('./utils/offline/printer');
  getZpl(label.label.url, settings, data)
    .then(zpl => {
      printLabel(printer, zpl)
        .then(printed => console.log(printed))
        .catch(err => console.log(err));
    });
});
ipcMain.on('update-fonts', (e, printerName) => {
  const fonts = arial + arialbold;
  printLabel(printerName, fonts)
    .then(jobID => {
      const intervalPrintStatus = setInterval(() => {
        try {
          print.getJob(printerName, jobID);
        } catch (err) {
          clearInterval(intervalPrintStatus);
          setTimeout(() => {
            e.sender.send('fonts-uploaded');
          }, 3500);
        }
      }, 500);


      /* const printers = win.webContents.getPrinters();

        printers.forEach(printer => {
          if (printer.name === printerName) {
            printer.status != 0 && console.log('status', printer.status);
            //if (printer.status === 3) e.sender.send('fonts-uploaded');
          }
        }); */
    })
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
  console.log(process.versions);
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
  win.webContents.send('update-available');
  // Track progress percent
  let downloadProgress = 0;
  // Prompt user to update
  dialog.showMessageBox({
    type: 'info',
    title: 'Actualización disponible',
    message: 'Una nueva versión está disponible. Actualizar ahora',
    buttons: ['Actualizar']
  }, buttonIndex => {
    // If not 'Update' button, return
    if (buttonIndex !== 0) return;

    // Else start download and show download progress in new window
    autoUpdater.downloadUpdate();

    // Create progress window
    let progressWin = new BrowserWindow({
      width: 400,
      height: 100,
      useContentSize: true,
      autoHideMenuBar: true,
      maximizable: false,
      fullscreen: false,
      fullscreenable: false,
      resizable: false
    });

    // Load progress HTML
    progressWin.loadURL('app://./index.html#progress');

    progressWin.on('closed', () => {
      progressWin = null;
    });

    // Listen for preogress request from progressWin
    ipcMain.on('download-progress-request', e => {
      e.returnValue = downloadProgress;
    });

    // Track download progress on autoUpdater
    autoUpdater.on('download-progress', d => {
      downloadProgress = d.percent;
    });


    autoUpdater.on('update-downloaded', () => {
      // Close progressWin
      if (progressWin) progressWin.close();
      // Prompt user to quit and install update
      dialog.showMessageBox({
        type: 'info',
        title: 'Descarga completa',
        message: 'Se ha completado la descarga. Haz click en instalar.',
        buttons: ['Instalar']
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
