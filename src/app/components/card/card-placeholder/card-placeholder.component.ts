import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-placeholder',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './card-placeholder.component.html',
  styleUrl: './card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPlaceholderComponent {
  @Input() heightPx: number = 0;
}
