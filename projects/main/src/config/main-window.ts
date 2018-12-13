import { BrowserWindowConstructorOptions } from 'electron';

import { isDevMode } from '@main/utils';

export const mainWindowOptions: BrowserWindowConstructorOptions = {
  x: 0,
  y: 0,
  show: false,
  webPreferences: {
    // disable web security in dev to load local file over file:// protocol
    webSecurity: !isDevMode()
  }
};
