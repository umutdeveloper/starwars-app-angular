import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Film } from '../../features/swapi/models/film';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCardComponent {
  @Input() film?: Film;
  @Input() peopleNames?: string | null;
}
