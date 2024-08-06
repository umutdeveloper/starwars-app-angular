import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesCardPlaceholderComponent } from './species-card-placeholder.component';

describe('SpeciesCardPlaceholderComponent', () => {
  let component: SpeciesCardPlaceholderComponent;
  let fixture: ComponentFixture<SpeciesCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesCardPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
