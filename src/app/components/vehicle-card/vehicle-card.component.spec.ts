import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCardComponent } from './vehicle-card.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('VehicleCardComponent', () => {
  let component: VehicleCardComponent;
  let fixture: ComponentFixture<VehicleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCardComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
