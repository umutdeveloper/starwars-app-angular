import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Film } from '../../features/swapi/models/film';
import { rootSelector } from '../../features/swapi/swapi.reducer';
import { films, people } from '../../features/swapi/swapi.state';
import { CommonModule } from '@angular/common';
import { FilmCardPlaceholderComponent } from '../../components/film-card/film-card-placeholder/film-card-placeholder.component';
import { FilmComponent } from './film/film.component';
import { SwapiListComponent } from '../../templates/swapi-list/swapi-list.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GridColumnComponent } from '../../components/grid/grid-column/grid-column.component';

const selectPageItemResults = createSelector(rootSelector, films.feature.selectPageItemResults);
const selectStatus = createSelector(rootSelector, films.feature.selectStatus);
const selectIsPending = createSelector(selectStatus, status => status === 'loading');

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [
    CommonModule,
    FilmComponent,
    FilmCardPlaceholderComponent,
    SwapiListComponent,
    GridComponent,
    GridColumnComponent,
  ],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent implements OnDestroy {
  readonly films$: Observable<Film[]>;
  readonly isPending$: Observable<boolean>;
  readonly filmFeatureDetails = films;

  ngOnDestroy(): void {
    this.store.dispatch(people.actions.clearRequestList());
  }

  constructor(private readonly store: Store) {
    this.films$ = this.store.select(selectPageItemResults);
    this.isPending$ = this.store.select(selectIsPending);
  }
}
