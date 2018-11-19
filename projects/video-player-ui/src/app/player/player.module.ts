import { NgModule } from '@angular/core';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';

import { PlayerComponent } from './containers/player/player.component';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  exports: [PlayerComponent]
})
export class PlayerModule {}
