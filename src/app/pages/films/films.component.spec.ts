import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { SwapiStore } from '../../features/swapi/swapi.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutService } from '../../templates/layout/layout.service';
import { provideMockElementRef } from '../../../../tests/mock-element-ref';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
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
      imports: [FilmsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideMockStore({ initialState }),
        provideAnimationsAsync(),
        LayoutService,
        provideMockElementRef(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
