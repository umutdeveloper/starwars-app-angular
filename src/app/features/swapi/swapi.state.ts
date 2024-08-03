import { mapToFilm } from './mappers/film.mapper';
import { mapToPerson } from './mappers/person.mapper';
import { mapToPlanet } from './mappers/planet.mapper';
import { mapToSpecies } from './mappers/species.mapper';
import { mapToStarship, mapToVehicle } from './mappers/transport.mapper';
import { createFeatureFor } from './swapi.state.base';

export type FeatureName = 'films' | 'people' | 'planets' | 'species' | 'starships' | 'vehicles';

export const films = createFeatureFor('films', mapToFilm);
export const people = createFeatureFor('people', mapToPerson);
export const planets = createFeatureFor('planets', mapToPlanet);
export const species = createFeatureFor('species', mapToSpecies);
export const starships = createFeatureFor('starships', mapToStarship);
export const vehicles = createFeatureFor('vehicles', mapToVehicle);
