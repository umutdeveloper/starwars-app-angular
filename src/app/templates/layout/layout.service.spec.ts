import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
