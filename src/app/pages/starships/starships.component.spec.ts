import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipsComponent } from './starships.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { SwapiStore } from '../../features/swapi/swapi.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('StarshipsComponent', () => {
  let component: StarshipsComponent;
  let fixture: ComponentFixture<StarshipsComponent>;
  const initialState: { swapi: Partial<SwapiStore> } = {
    swapi: {
      starships: {
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
      imports: [StarshipsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideMockStore({ initialState }),
        provideAnimationsAsync(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StarshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
