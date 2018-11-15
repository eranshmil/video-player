import './polyfills';
import './vendor';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

// Add base element for Angular Router support.
const base = document.createElement('base');
base.setAttribute('href', './');
document.head.appendChild(base);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: string) => console.error(err));
