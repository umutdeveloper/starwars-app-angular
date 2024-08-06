import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-grid-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-column.component.html',
  styleUrl: './grid-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridColumnComponent {}
