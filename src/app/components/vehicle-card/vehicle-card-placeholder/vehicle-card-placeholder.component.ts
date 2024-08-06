import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPlaceholderComponent } from '../../card/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-vehicle-card-placeholder',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './vehicle-card-placeholder.component.html',
  styleUrl: './vehicle-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleCardPlaceholderComponent {}
