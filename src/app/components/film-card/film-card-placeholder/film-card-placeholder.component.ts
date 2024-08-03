import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-film-card-placeholder',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './film-card-placeholder.component.html',
  styleUrl: './film-card-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardPlaceholderComponent {}
