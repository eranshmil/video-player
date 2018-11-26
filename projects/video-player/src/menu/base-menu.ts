import { MenuItemConstructorOptions, dialog } from 'electron';

import { EventTypes } from '@common/constants';
import { ALLOWED_EXTENSIONS } from '@common/utils';
import { isDevMode } from '@main/utils';
import { Shortcuts } from '@main/config/shortcuts';
import { getMainWindow } from '@main/core';

function openFile() {
  const browserWindow = getMainWindow();

  dialog.showOpenDialog(
    browserWindow,
    {
      properties: ['openFile'],
      filters: [{ name: 'Videos', extensions: ALLOWED_EXTENSIONS }]
    },
    files => {
      if (files) {
        browserWindow.webContents.send(EventTypes.openFile, ...files);
      }
    }
  );
}

export function createBaseMenu(): MenuItemConstructorOptions[] {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: Shortcuts.openFile,
          click: openFile.bind(this)
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
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    }
  ];

  if (isDevMode()) {
    template.push({
      label: 'Developer',
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
    });
  }

  return template;
}
