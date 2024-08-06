import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { rootSelector } from '../../features/swapi/swapi.reducer';
import { vehicles } from '../../features/swapi/swapi.state';
import { CommonModule } from '@angular/common';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { VehicleCardPlaceholderComponent } from '../../components/vehicle-card/vehicle-card-placeholder/vehicle-card-placeholder.component';
import { SwapiListComponent } from '../../templates/swapi-list/swapi-list.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GridColumnComponent } from '../../components/grid/grid-column/grid-column.component';
import { Observable } from 'rxjs';
import { Vehicle } from '../../features/swapi/models/transport';

const selectPageItemResults = createSelector(rootSelector, vehicles.feature.selectPageItemResults);

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    VehicleCardComponent,
    VehicleCardPlaceholderComponent,
    SwapiListComponent,
    GridComponent,
    GridColumnComponent,
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent {
  readonly vehicles$: Observable<Vehicle[]>;
  readonly vehiclesFeatureDetails = vehicles;

  constructor(private readonly store: Store) {
    this.vehicles$ = this.store.select(selectPageItemResults);
  }
}
