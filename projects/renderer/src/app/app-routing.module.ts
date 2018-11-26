import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerComponent } from './player/containers/player/player.component';

const routes: Routes = [
  // todo: set default route
  // { path: '', redirectTo: '/', pathMatch: 'full' },
  // todo: enable lazy load?
  { path: '', component: PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
