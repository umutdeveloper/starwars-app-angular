import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandler } from './error.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('GlobalErrorHandler', () => {
  let service: GlobalErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler, provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(GlobalErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
