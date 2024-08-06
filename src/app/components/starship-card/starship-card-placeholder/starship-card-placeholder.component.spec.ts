import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardPlaceholderComponent } from './starship-card-placeholder.component';

describe('StarshipCardPlaceholderComponent', () => {
  let component: StarshipCardPlaceholderComponent;
  let fixture: ComponentFixture<StarshipCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipCardPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarshipCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
