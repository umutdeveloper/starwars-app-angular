import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCardPlaceholderComponent } from './vehicle-card-placeholder.component';

describe('VehicleCardPlaceholderComponent', () => {
  let component: VehicleCardPlaceholderComponent;
  let fixture: ComponentFixture<VehicleCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCardPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
