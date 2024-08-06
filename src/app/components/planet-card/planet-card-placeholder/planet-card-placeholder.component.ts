import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPlaceholderComponent } from '../../card/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-planet-card-placeholder',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './planet-card-placeholder.component.html',
  styleUrl: './planet-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetCardPlaceholderComponent {}
