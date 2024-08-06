import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPlaceholderComponent } from '../../card/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-species-card-placeholder',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './species-card-placeholder.component.html',
  styleUrl: './species-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesCardPlaceholderComponent {}
