import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Planet } from '../../features/swapi/models/planet';

@Component({
  selector: 'app-planet-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './planet-card.component.html',
  styleUrls: ['../card/card.scss', './planet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetCardComponent {
  @Input() planet?: Planet;
}
