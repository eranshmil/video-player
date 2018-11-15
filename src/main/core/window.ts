import { BrowserWindow, screen } from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';

export let mainWindow: BrowserWindow;

function initWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
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
  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;

  initWindow();

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(url);
}
