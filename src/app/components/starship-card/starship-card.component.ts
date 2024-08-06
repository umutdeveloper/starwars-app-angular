import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StarShip } from '../../features/swapi/models/transport';

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './starship-card.component.html',
  styleUrls: ['../card/card.scss', './starship-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarshipCardComponent {
  @Input() starship?: StarShip;
}
