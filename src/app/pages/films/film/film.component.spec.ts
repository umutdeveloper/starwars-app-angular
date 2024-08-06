import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmComponent } from './film.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { SwapiStore } from '../../../features/swapi/swapi.reducer';
import { provideMockStore } from '@ngrx/store/testing';

describe('FilmComponent', () => {
  let component: FilmComponent;
  let fixture: ComponentFixture<FilmComponent>;
  const initialState: { swapi: Partial<SwapiStore> } = {
    swapi: {
      people: {
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
      imports: [FilmComponent],
      providers: [provideExperimentalZonelessChangeDetection(), provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
