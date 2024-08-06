import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DesktopMenuComponent } from '../desktop-menu/desktop-menu.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import MENU_SVG from '../../../icons/menu';
import ROCKET_SVG from '../../../icons/rocket';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DesktopMenuComponent, MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isMobile: boolean | null = null;
  @Output() onOpenSidenav = new EventEmitter();

  openSidenav() {
    this.onOpenSidenav.emit();
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('menu', sanitizer.bypassSecurityTrustHtml(MENU_SVG));
    iconRegistry.addSvgIconLiteral('rocket', sanitizer.bypassSecurityTrustHtml(ROCKET_SVG));
  }
}
