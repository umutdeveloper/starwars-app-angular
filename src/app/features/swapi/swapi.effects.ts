import { films, people, planets, species, starships, vehicles } from './swapi.state';

const effects = {
  ...films.effects,
  ...people.effects,
  ...planets.effects,
  ...species.effects,
  ...starships.effects,
  ...vehicles.effects,
};

export default effects;