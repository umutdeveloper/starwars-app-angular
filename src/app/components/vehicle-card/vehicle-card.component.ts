import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Vehicle } from '../../features/swapi/models/transport';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['../card/card.scss', './vehicle-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCardComponent {
  @Input() vehicle?: Vehicle;
}
