import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Species } from '../../features/swapi/models/species';

@Component({
  selector: 'app-species-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './species-card.component.html',
  styleUrls: ['../card/card.scss', './species-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeciesCardComponent {
  @Input() species?: Species;
}
