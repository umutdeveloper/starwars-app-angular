import { combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { films, people, planets, species, starships, vehicles } from './swapi.state';

const swapiReducer = combineReducers({
  films: films.reducer,
  people: people.reducer,
  planets: planets.reducer,
  species: species.reducer,
  starships: starships.reducer,
  vehicles: vehicles.reducer,
});

export const name = 'swapi';
export const rootSelector = createFeatureSelector<ReturnType<typeof swapiReducer>>(name);

export default swapiReducer;
