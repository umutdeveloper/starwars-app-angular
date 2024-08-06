import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardActionsComponent } from './person-card-actions.component';

describe('PersonCardActionsComponent', () => {
  let component: PersonCardActionsComponent;
  let fixture: ComponentFixture<PersonCardActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCardActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
