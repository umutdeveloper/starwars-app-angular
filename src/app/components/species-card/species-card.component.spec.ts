import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesCardComponent } from './species-card.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SpeciesCardComponent', () => {
  let component: SpeciesCardComponent;
  let fixture: ComponentFixture<SpeciesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesCardComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
