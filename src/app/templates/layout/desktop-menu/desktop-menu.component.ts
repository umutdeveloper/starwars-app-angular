import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DOCUMENT } from '@angular/common';
import { MenuComponent } from '../menu.component';

@Component({
  selector: 'app-desktop-menu',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopMenuComponent extends MenuComponent {
  constructor(router: Router, @Inject(DOCUMENT) document: Document) {
    super(router, document);
  }
}
