import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from '../../features/swapi/models/planet';
import { createSelector, Store } from '@ngrx/store';
import { rootSelector } from '../../features/swapi/swapi.reducer';
import { planets } from '../../features/swapi/swapi.state';
import { CommonModule } from '@angular/common';
import { PlanetCardComponent } from '../../components/planet-card/planet-card.component';
import { PlanetCardPlaceholderComponent } from '../../components/planet-card/planet-card-placeholder/planet-card-placeholder.component';
import { SwapiListComponent } from '../../templates/swapi-list/swapi-list.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GridColumnComponent } from '../../components/grid/grid-column/grid-column.component';

const selectPageItemResults = createSelector(rootSelector, planets.feature.selectPageItemResults);
const selectStatus = createSelector(rootSelector, planets.feature.selectStatus);
const selectIsPending = createSelector(selectStatus, status => status === 'loading');

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [
    CommonModule,
    PlanetCardComponent,
    PlanetCardPlaceholderComponent,
    SwapiListComponent,
    GridComponent,
    GridColumnComponent,
  ],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetsComponent {
  readonly planets$: Observable<Planet[]>;
  readonly isPending$: Observable<boolean>;
  readonly planetsFeatureDetails = planets;

  constructor(private readonly store: Store) {
    this.planets$ = this.store.select(selectPageItemResults);
    this.isPending$ = this.store.select(selectIsPending);
  }
}
