import { TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideMockElementRef } from '../../../../tests/mock-element-ref';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService, provideExperimentalZonelessChangeDetection(), provideMockElementRef()],
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
