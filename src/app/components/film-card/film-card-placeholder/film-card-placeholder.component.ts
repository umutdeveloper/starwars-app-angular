import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardPlaceholderComponent } from '../../card/card-placeholder/card-placeholder.component';

@Component({
  selector: 'app-film-card-placeholder',
  standalone: true,
  imports: [CardPlaceholderComponent],
  templateUrl: './film-card-placeholder.component.html',
  styleUrl: './film-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardPlaceholderComponent {}
