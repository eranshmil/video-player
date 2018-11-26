import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  NgZone
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ElectronService } from 'ngx-electron';
import { VgAPI } from 'videogular2/core';

import { EventTypes } from '@common/constants';
import { createLocalUrl } from '@common/utils';

import { DialogService } from '@renderer/shared';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  public src: string;
  public srcSubtitles: string;

  private _vgApi: VgAPI;
  private _errorSubscription: Subscription;

  constructor(
    private _electron: ElectronService,
    private _dialog: DialogService,
    private _zone: NgZone
  ) {}

  ngOnInit() {
    this._initMenuListener();
  }

  ngOnDestroy() {
    this._errorSubscription.unsubscribe();
  }

  private _initMenuListener() {
    this._electron.ipcRenderer.on(EventTypes.openFile, (event, path) =>
      this._changeSources(path)
    );
  }

  public onPlayerReady(api: VgAPI) {
    this._vgApi = api;

    this._initMediaErrorHandler();
  }

  private _initMediaErrorHandler() {
    this._errorSubscription = this._vgApi
      .getDefaultMedia()
      .subscriptions.error.subscribe(event => {
        if (!this.src) {
          return;
        }

        this.src = null;

        this._dialog.showMessage('Invalid video format or corrupted file');
      });
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('document:drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    const { files } = event.dataTransfer;

    // todo: support opening multiple files at once
    if (!files || !files[0]) {
      return;
    }

    this._changeSources(files[0].path);
  }

  private _changeSources(path: string) {
    const fileLocalUrl = createLocalUrl(path);

    if (fileLocalUrl.endsWith('.vtt')) {
      this.srcSubtitles = fileLocalUrl;
    } else {
      this.src = fileLocalUrl;
      this.srcSubtitles = null;
    }
  }
}
