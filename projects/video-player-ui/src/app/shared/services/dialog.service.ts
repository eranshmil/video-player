import { Injectable } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { SharedModule } from '../shared.module';

@Injectable({
  providedIn: SharedModule
})
export class DialogService {
  private _remote = this._electron.remote;

  constructor(private _electron: ElectronService) {}

  public showMessage(message: string) {
    this._remote.dialog.showMessageBox(this._remote.getCurrentWindow(), {
      message
    });
  }
}
