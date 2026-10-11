import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    // Hash routing evita errores al recargar páginas en GitHub Pages.
    provideRouter(routes, withHashLocation())
  ]
};
