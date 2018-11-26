import { Menu, MenuItemConstructorOptions } from 'electron';

import { isMacOS } from '@main/utils';
import { createMacMenu } from './mac-menu';
import { createBaseMenu } from './base-menu';

export function initMenu() {
  let template: MenuItemConstructorOptions[];

  if (isMacOS()) {
    template = createMacMenu();
  } else {
    template = createBaseMenu();
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
