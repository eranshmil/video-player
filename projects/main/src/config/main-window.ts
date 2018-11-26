import { BrowserWindowConstructorOptions } from 'electron';

export const mainWindowOptions: BrowserWindowConstructorOptions = {
  x: 0,
  y: 0,
  show: false,
  // todo: find secure approach
  webPreferences: {
    webSecurity: false
  }
};
