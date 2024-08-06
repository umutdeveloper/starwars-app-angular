import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesComponent } from './species.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { SwapiStore } from '../../features/swapi/swapi.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('SpeciesComponent', () => {
  let component: SpeciesComponent;
  let fixture: ComponentFixture<SpeciesComponent>;
  const initialState: { swapi: Partial<SwapiStore> } = {
    swapi: {
      species: {
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
      imports: [SpeciesComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideMockStore({ initialState }),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
