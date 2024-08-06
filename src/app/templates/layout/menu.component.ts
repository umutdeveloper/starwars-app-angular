import { filter, map, Observable, shareReplay, startWith } from 'rxjs';
import { MENU_ITEMS } from './constants';
import { NavigationEnd, Router } from '@angular/router';

export abstract class MenuComponent {
  menuItems = MENU_ITEMS;
  currentPath$: Observable<string>;

  constructor(
    private router: Router,
    private document: Document
  ) {
    this.currentPath$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects),
      startWith(this.document.location.pathname),
      map(link => link.replace('/', '')),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
