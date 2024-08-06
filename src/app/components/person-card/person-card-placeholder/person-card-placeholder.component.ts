import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPlaceholderComponent } from '../../card/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-person-card-placeholder',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './person-card-placeholder.component.html',
  styleUrl: './person-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardPlaceholderComponent {}
