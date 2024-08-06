import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsComponent } from './planets.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SwapiStore } from '../../features/swapi/swapi.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutService } from '../../templates/layout/layout.service';
import { provideMockElementRef } from '../../../../tests/mock-element-ref';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;
  let store: MockStore;
  const initialState: { swapi: Partial<SwapiStore> } = {
    swapi: {
      planets: {
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
      imports: [PlanetsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideMockStore({ initialState }),
        provideAnimationsAsync(),
        LayoutService,
        provideMockElementRef(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
