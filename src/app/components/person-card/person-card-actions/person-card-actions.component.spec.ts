import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardActionsComponent } from './person-card-actions.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('PersonCardActionsComponent', () => {
  let component: PersonCardActionsComponent;
  let fixture: ComponentFixture<PersonCardActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardActionsComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
