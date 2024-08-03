import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Film } from '../../features/swapi/models/film';
import { rootSelector } from '../../features/swapi/swapi.reducer';
import { films } from '../../features/swapi/swapi.state';
import { CommonModule } from '@angular/common';
import { FilmCardPlaceholderComponent } from '../../components/film-card/film-card-placeholder/film-card-placeholder.component';
import { FilmComponent } from './film/film.component';

const selectPageItemResults = createSelector(rootSelector, films.feature.selectPageItemResults);
const selectStatus = createSelector(rootSelector, films.feature.selectStatus);
const selectIsPending = createSelector(selectStatus, status => status === 'loading');
const selectIsPendingWithNoItems = createSelector(selectPageItemResults, selectIsPending, (pageResults, isPending) => {
  return !pageResults.length && isPending;
});
const selectIsNotFound = createSelector(
  selectPageItemResults,
  selectIsPending,
  selectStatus,
  (pageResults, isPending, status) => {
    return !pageResults.length && !isPending && status !== 'idle';
  }
);

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, FilmComponent, FilmCardPlaceholderComponent],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsComponent {
  films$: Observable<Film[]>;
  isPendingWithNoItems$: Observable<boolean>;
  isNotFound$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.films$ = this.store.select(selectPageItemResults);
    this.isPendingWithNoItems$ = this.store.select(selectIsPendingWithNoItems);
    this.isNotFound$ = this.store.select(selectIsNotFound);
    this.store.dispatch(films.actions.fetchList({ page: 1, search: '' }));
  }
}
