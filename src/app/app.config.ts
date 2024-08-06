import { ApplicationConfig, ErrorHandler, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { GlobalErrorHandler } from './templates/error/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { routes } from './app.routes';
import { provideAppState } from './app.state';
import effects from './app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    ...provideAppState,
    provideEffects(effects),
    provideHttpClient(withFetch()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler, deps: [MatSnackBar, Router] },
  ],
};
