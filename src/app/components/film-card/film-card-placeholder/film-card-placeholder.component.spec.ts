import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardPlaceholderComponent } from './film-card-placeholder.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('FilmCardPlaceholderComponent', () => {
  let component: FilmCardPlaceholderComponent;
  let fixture: ComponentFixture<FilmCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCardPlaceholderComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
