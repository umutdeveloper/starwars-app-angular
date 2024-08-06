import { ElementRef } from '@angular/core';

class MockElementRef extends ElementRef {}

export const provideMockElementRef = () => ({ provide: ElementRef, useClass: MockElementRef });