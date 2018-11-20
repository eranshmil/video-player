import { BrowserWindow, Menu, MenuItem, dialog, ipcMain } from 'electron';

import { EventTypes } from '@common/constants/event-types';

const isDevelopment = process.argv.includes('--serve');

export let mainWindow: BrowserWindow | null = null;

function initMenu() {
  const menu = Menu.buildFromTemplate([
    {
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          // TODO: Remove this when https://github.com/electron/electron/issues/15653 is fixed
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click: () => {
            dialog.showOpenDialog(
              mainWindow,
              {
                properties: ['openFile'],
                filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }]
              },
              function(files) {
                if (files !== undefined) {
                  console.log(files);
                  ipcMain.emit(EventTypes.openFile, ...files);
                }
              }
            );
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

function initWindow() {
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    show: false,
    // todo: find secure approach
    webPreferences: {
      webSecurity: false
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', () => (mainWindow = null));

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus();

    setImmediate(() => mainWindow.focus());
  });

  initMenu();
}

export function createWindow() {
  initWindow();

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:4200/');
  } else {
    mainWindow.loadFile('index.html');
  }
}
