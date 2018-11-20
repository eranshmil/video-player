import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';

import { PlayerComponent } from './containers/player/player.component';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule {}
