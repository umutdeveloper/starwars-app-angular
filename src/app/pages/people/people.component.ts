import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PersonCardComponent } from '../../components/person-card/person-card.component';
import { PersonCardPlaceholderComponent } from '../../components/person-card/person-card-placeholder/person-card-placeholder.component';
import { SwapiListComponent } from '../../templates/swapi-list/swapi-list.component';
import { GridComponent } from '../../components/grid/grid.component';
import { GridColumnComponent } from '../../components/grid/grid-column/grid-column.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../features/swapi/models/person';
import { people } from '../../features/swapi/swapi.state';
import { createSelector, Store } from '@ngrx/store';
import { rootSelector } from '../../features/swapi/swapi.reducer';

const selectPageItemResults = createSelector(rootSelector, people.feature.selectPageItemResults);

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    CommonModule,
    PersonCardComponent,
    PersonCardPlaceholderComponent,
    SwapiListComponent,
    GridComponent,
    GridColumnComponent,
  ],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent {
  readonly people$: Observable<Person[]>;
  readonly peopleFeatureDetails = people;

  constructor(private readonly store: Store) {
    this.people$ = this.store.select(selectPageItemResults);
  }
}
