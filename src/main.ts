import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Punto de entrada de la aplicación Angular.
bootstrapApplication(AppComponent, appConfig)
  .catch((error: unknown) => console.error('No fue posible iniciar la aplicación:', error));
