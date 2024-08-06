import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
  constructor(private elementRef: ElementRef) {}

  scrollToTop() {
    const containerWrapper: HTMLDivElement = this.elementRef.nativeElement.querySelector('.container-wrapper');
    containerWrapper.scrollTo(0, 0);
  }
}
