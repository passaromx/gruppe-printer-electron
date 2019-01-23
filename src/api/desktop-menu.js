/* eslint-disable import/no-extraneous-dependencies */
import { remote } from 'electron';
// import bus from './event';

export default app => {
  console.log(app.$store.getters['auth/isAdmin']);
  const template = [
    // {
    //   label: 'Productos',
    //   submenu: [
    //     {
    //       label: 'Nuevo',
    //       accelerator: 'CmdOrCtrl+N',
    //       // click() { bus.$emit('newItem'); }
    //     },
    //     {
    //       label: 'Borrar',
    //       accelerator: 'CmdOrCtrl+Backspace',
    //       // click() { window.deleteItem(-1); }
    //     },
    //     { type: 'separator' },
    //     {
    //       label: 'Search Items',
    //       accelerator: 'CmdOrCtrl+S',
    //       // click() { bus.$emit('search'); }
    //     }
    //   ]
    // },
    // {
    //   label: 'Impresión',
    //   submenu: [
    //     {
    //       label: 'Imprimir',
    //       accelerator: 'CmdOrCtrl+P',
    //       // click() { bus.$emit('newItem'); }
    //     },
    //     {
    //       label: 'Syncronizar',
    //       accelerator: 'CmdOrCtrl+S',
    //       click() { app.$eventHub.$emit('sync'); }
    //     },
    //     {
    //       label: 'Abrir PDF',
    //       accelerator: 'CmdOrCtrl+Shift+Enter',
    //       // click() { bus.$emit('readItem'); }
    //     }
    //   ]
    // },
    {
      label: 'Edición',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'Vista',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Ventana',
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    // {
    //   role: 'help',
    //   submenu: [
    //     {
    //       label: 'Learn More',
    //       // click() { shell.openExternal('https://electronjs.org'); }
    //     }
    //   ]
    // }
  ];

  // Mac specific
  if (process.platform === 'darwin') {
    template.unshift({
      label: remote.app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          role: 'services',
          submenu: []
        },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });

    // Mac extra window options
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  const menu = remote.Menu.buildFromTemplate(template);
  remote.Menu.setApplicationMenu(menu);
};
