import { provideState } from '@ngrx/store';
import swapiReducer, { name as swapiFeatureName } from './features/swapi/swapi.reducer';

export const provideAppState = [provideState(swapiFeatureName, swapiReducer)];
