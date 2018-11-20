import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlayerModule } from './player/player.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxElectronModule, PlayerModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
