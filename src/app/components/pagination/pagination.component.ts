import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() prevDisabled: boolean = false;
  @Input() nextDisabled: boolean = false;
  @Output() prevClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();

  onPrevClick(): void {
    this.prevClick.emit();
  }

  onNextClick(): void {
    this.nextClick.emit();
  }
}
