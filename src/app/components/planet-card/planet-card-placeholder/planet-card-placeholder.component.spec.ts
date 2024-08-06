import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetCardPlaceholderComponent } from './planet-card-placeholder.component';

describe('PlanetCardPlaceholderComponent', () => {
  let component: PlanetCardPlaceholderComponent;
  let fixture: ComponentFixture<PlanetCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetCardPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
