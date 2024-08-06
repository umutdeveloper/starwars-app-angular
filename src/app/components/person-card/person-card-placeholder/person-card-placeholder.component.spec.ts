import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardPlaceholderComponent } from './person-card-placeholder.component';

describe('PersonCardPlaceholderComponent', () => {
  let component: PersonCardPlaceholderComponent;
  let fixture: ComponentFixture<PersonCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
