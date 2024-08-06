import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HeaderComponent } from '../header/header.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    HeaderComponent,
    MobileMenuComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  isMobile$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe(['(max-width: 720px)']).pipe(
      map(result => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
