import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCardPlaceholderComponent } from './film-card-placeholder.component';

describe('FilmCardPlaceholderComponent', () => {
  let component: FilmCardPlaceholderComponent;
  let fixture: ComponentFixture<FilmCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCardPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
