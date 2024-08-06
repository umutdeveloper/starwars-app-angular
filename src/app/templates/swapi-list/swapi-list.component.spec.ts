import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapiListComponent } from './swapi-list.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Film } from '../../features/swapi/models/film';
import { SwapiStore } from '../../features/swapi/swapi.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { createFeatureFor } from '../../features/swapi/swapi.state.base';
import { mapToFilm } from '../../features/swapi/mappers/film.mapper';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('SwapiListComponent', () => {
  let component: SwapiListComponent<Film>;
  let fixture: ComponentFixture<SwapiListComponent<Film>>;
  const initialState: { swapi: Partial<SwapiStore> } = {
    swapi: {
      films: {
        count: 0,
        pagination: {
          search: '',
          page: 1,
          pageSize: 10,
        },
        hasNext: false,
        hasPrev: false,
        pageResults: [],
        requestedList: [],
        status: 'idle',
        itemStatus: 'idle',
        error: null,
        ids: [],
        entities: {},
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapiListComponent<Film>],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideMockStore({ initialState }),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SwapiListComponent<Film>);
    component = fixture.componentInstance;
    component.featureDetails = createFeatureFor<Film>('films', mapToFilm);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
