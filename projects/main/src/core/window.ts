import { BrowserWindow } from 'electron';

import { isDevMode } from '@main/utils';
import { mainWindowOptions } from '@main/config';
import { initMenu } from '@main/menu';

let mainWindow: BrowserWindow | null = null;

function createMainWindow(): BrowserWindow {
  mainWindow = new BrowserWindow(mainWindowOptions);

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', () => (mainWindow = null));
  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus();

    setImmediate(() => mainWindow.focus());
  });

  if (isDevMode()) {
    mainWindow.loadURL('http://localhost:4200/');
  } else {
    mainWindow.loadFile('index.html');
  }

  initMenu();

  return mainWindow;
}

export function getMainWindow(): BrowserWindow {
  return BrowserWindow.getFocusedWindow() || mainWindow || createMainWindow();
}
