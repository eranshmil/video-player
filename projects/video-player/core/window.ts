import { BrowserWindow, screen } from 'electron';

const isDevelopment = process.argv.includes('--serve');

export let mainWindow: BrowserWindow | null = null;

function initWindow() {
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    show: false
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('close', () => (mainWindow = null));

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus();

    setImmediate(() => mainWindow.focus());
  });
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
