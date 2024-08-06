import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPlaceholderComponent } from '../../card/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-starship-card-placeholder',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './starship-card-placeholder.component.html',
  styleUrl: './starship-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipCardPlaceholderComponent {}
