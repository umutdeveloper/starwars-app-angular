import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMenuComponent } from './desktop-menu.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('DesktopMenuComponent', () => {
  let component: DesktopMenuComponent;
  let fixture: ComponentFixture<DesktopMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopMenuComponent],
      providers: [provideExperimentalZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
