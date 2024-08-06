import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-badge',
  standalone: true,
  imports: [],
  templateUrl: './card-badge.component.html',
  styleUrl: './card-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBadgeComponent {}
