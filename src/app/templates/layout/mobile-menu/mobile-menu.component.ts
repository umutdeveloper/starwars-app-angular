import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { MenuComponent } from '../menu.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, MatListModule, RouterLink],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent extends MenuComponent {
  @Output() onClick = new EventEmitter();
  constructor(router: Router, @Inject(DOCUMENT) document: Document) {
    super(router, document);
  }
}
