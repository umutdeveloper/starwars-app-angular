import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { films } from './features/swapi/swapi.state';
import { Film } from './features/swapi/models/film';
import { CommonModule } from '@angular/common';
import { rootSelector } from './features/swapi/swapi.reducer';

const selectPageItemResults = createSelector(rootSelector, films.feature.selectPageItemResults);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  films$: Observable<Film[]>;

  constructor(private readonly store: Store) {
    this.films$ = this.store.select(selectPageItemResults);
    this.store.dispatch(films.actions.fetchList({ page: 1, search: '' }));
  }
}
