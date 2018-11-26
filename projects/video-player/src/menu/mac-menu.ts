import { app, MenuItemConstructorOptions } from 'electron';

import { createBaseMenu } from './base-menu';

function addAppMenu(): MenuItemConstructorOptions {
  return {
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  };
}

function replaceWindowsMenu(
  menuItem: MenuItemConstructorOptions
): MenuItemConstructorOptions {
  if (menuItem.role === 'window') {
    menuItem.submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }

  return menuItem;
}

export function createMacMenu(): MenuItemConstructorOptions[] {
  const template = createBaseMenu();

  template.unshift(addAppMenu());

  return template.map(menuItem => replaceWindowsMenu(menuItem));
}
