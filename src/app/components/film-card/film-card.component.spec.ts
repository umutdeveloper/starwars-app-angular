import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardComponent } from './film-card.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCardComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
