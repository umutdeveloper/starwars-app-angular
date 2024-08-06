import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridColumnComponent } from './grid-column.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('GridColumnComponent', () => {
  let component: GridColumnComponent;
  let fixture: ComponentFixture<GridColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridColumnComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(GridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
