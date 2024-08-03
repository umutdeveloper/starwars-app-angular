import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Film } from '../../../features/swapi/models/film';
import { rootSelector } from '../../../features/swapi/swapi.reducer';
import { people } from '../../../features/swapi/swapi.state';
import { FilmCardComponent } from '../../../components/film-card/film-card.component';
import { distinctUntilChanged, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

const selectPeopleResults = createSelector(rootSelector, people.feature.selectEntities);
const selectPeopleNamesForFilm = (film: Film) =>
  createSelector([selectPeopleResults], entities => {
    const filteredList = film.characters.filter(char => !!entities[char]);
    return filteredList.length === film.characters.length
      ? filteredList.map(char => entities[char]?.name).join(', ')
      : '';
  });

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [FilmCardComponent, CommonModule],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmComponent implements OnInit {
  @Input() film?: Film;
  peopleNames$?: Observable<string>;

  ngOnInit(): void {
    if (this.film) {
      this.peopleNames$ = this.store.select(selectPeopleNamesForFilm(this.film)).pipe(distinctUntilChanged());
      this.film.characters.forEach(char => {
        this.store.dispatch(people.actions.requestItem(char));
      });
    }
  }

  constructor(private readonly store: Store) {}
}
