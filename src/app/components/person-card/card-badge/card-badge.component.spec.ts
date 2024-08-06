import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBadgeComponent } from './card-badge.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('CardBadgeComponent', () => {
  let component: CardBadgeComponent;
  let fixture: ComponentFixture<CardBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBadgeComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
