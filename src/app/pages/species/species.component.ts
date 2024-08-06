import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { rootSelector } from '../../features/swapi/swapi.reducer';
import { species } from '../../features/swapi/swapi.state';
import { CommonModule } from '@angular/common';
import { SpeciesCardComponent } from '../../components/species-card/species-card.component';
import { SpeciesCardPlaceholderComponent } from '../../components/species-card/species-card-placeholder/species-card-placeholder.component';
import { SwapiListComponent } from '../../templates/swapi-list/swapi-list.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GridColumnComponent } from '../../components/grid/grid-column/grid-column.component';
import { Observable } from 'rxjs';
import { Species } from '../../features/swapi/models/species';

const selectPageItemResults = createSelector(rootSelector, species.feature.selectPageItemResults);
const selectStatus = createSelector(rootSelector, species.feature.selectStatus);
const selectIsPending = createSelector(selectStatus, status => status === 'loading');

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [
    CommonModule,
    SpeciesCardComponent,
    SpeciesCardPlaceholderComponent,
    SwapiListComponent,
    GridComponent,
    GridColumnComponent,
  ],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesComponent {
  readonly species$: Observable<Species[]>;
  readonly isPending$: Observable<boolean>;
  readonly speciesFeatureDetails = species;

  constructor(private readonly store: Store) {
    this.species$ = this.store.select(selectPageItemResults);
    this.isPending$ = this.store.select(selectIsPending);
  }
}
