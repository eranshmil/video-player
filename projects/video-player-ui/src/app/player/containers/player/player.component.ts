import { Component, HostListener, OnInit } from '@angular/core';

import { ElectronService } from 'ngx-electron';

import { EventTypes } from '@common/constants';
import { createLocalUrl } from '@common/utils';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public src: string;

  constructor(private _electron: ElectronService) {}

  ngOnInit() {
    this._initMenuListener();
  }

  private _initMenuListener() {
    this._electron.remote.ipcMain.on(
      EventTypes.openFile,
      path => (this.src = createLocalUrl(path))
    );
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
