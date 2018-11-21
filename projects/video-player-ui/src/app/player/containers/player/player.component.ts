import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ElectronService } from 'ngx-electron';
import { VgAPI } from 'videogular2/core';

import { EventTypes } from '@common/constants';
import { createLocalUrl } from '@common/utils';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  public src: string;

  private _api: VgAPI;
  private _errorSubscription: Subscription;

  constructor(private _electron: ElectronService) {}

  ngOnInit() {
    this._initMenuListener();
  }

  ngOnDestroy() {
    this._errorSubscription.unsubscribe();
  }

  private _initMenuListener() {
    this._electron.remote.ipcMain.on(
      EventTypes.openFile,
      path => (this.src = createLocalUrl(path))
    );
  }

  public onPlayerReady(api: VgAPI) {
    this._api = api;

    this._initMediaErrorHandler();
  }

  private _initMediaErrorHandler() {
    this._errorSubscription = this._api
      .getDefaultMedia()
      .subscriptions.error.subscribe(event => {
        if (!this.src) {
          return;
        }

        this.src = null;

        this._electron.ipcRenderer.send(EventTypes.showError, [
          'Invalid video format or corrupted file'
        ]);
      });
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('document:drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const { path } = event.dataTransfer.files[0];

      this.src = createLocalUrl(path);
    }
  }
}
