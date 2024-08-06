import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { rootSelector } from '../../features/swapi/swapi.reducer';
import { starships } from '../../features/swapi/swapi.state';
import { CommonModule } from '@angular/common';
import { StarshipCardComponent } from '../../components/starship-card/starship-card.component';
import { StarshipCardPlaceholderComponent } from '../../components/starship-card/starship-card-placeholder/starship-card-placeholder.component';
import { SwapiListComponent } from '../../templates/swapi-list/swapi-list.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GridColumnComponent } from '../../components/grid/grid-column/grid-column.component';
import { Observable } from 'rxjs';
import { StarShip } from '../../features/swapi/models/transport';

const selectPageItemResults = createSelector(rootSelector, starships.feature.selectPageItemResults);
const selectStatus = createSelector(rootSelector, starships.feature.selectStatus);
const selectIsPending = createSelector(selectStatus, status => status === 'loading');

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [
    CommonModule,
    StarshipCardComponent,
    StarshipCardPlaceholderComponent,
    SwapiListComponent,
    GridComponent,
    GridColumnComponent,
  ],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipsComponent {
  readonly starships$: Observable<StarShip[]>;
  readonly isPending$: Observable<boolean>;
  readonly starshipsFeatureDetails = starships;

  constructor(private readonly store: Store) {
    this.starships$ = this.store.select(selectPageItemResults);
    this.isPending$ = this.store.select(selectIsPending);
  }
}
