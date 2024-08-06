import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Person } from '../../../features/swapi/models/person';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import MOVIE_ICON from '../../../icons/movie';
import PETS_ICON from '../../../icons/pets';
import ROCKET_SVG from '../../../icons/rocket';
import DIRECTIONS_CAR_ICON from '../../../icons/directions-car';

interface ActionButton {
  icon: string;
  length: number;
  color: string;
}

@Component({
  selector: 'app-person-card-actions',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './person-card-actions.component.html',
  styleUrl: './person-card-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCardActionsComponent implements OnInit {
  @Input() person?: Person;
  actionButtons?: ActionButton[];

  ngOnInit(): void {
    if (this.person) {
      this.actionButtons = [
        { icon: 'movie', length: this.person?.films.length, color: '#90CAF9' },
        { icon: 'pets', length: this.person?.species.length, color: '#A5D6A7' },
        { icon: 'car', length: this.person?.vehicles.length, color: '#EF9A9A' },
        { icon: 'rocket', length: this.person?.starships.length, color: '#FFAB91' },
      ];
    }
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('movie', sanitizer.bypassSecurityTrustHtml(MOVIE_ICON));
    iconRegistry.addSvgIconLiteral('pets', sanitizer.bypassSecurityTrustHtml(PETS_ICON));
    iconRegistry.addSvgIconLiteral('rocket', sanitizer.bypassSecurityTrustHtml(ROCKET_SVG));
    iconRegistry.addSvgIconLiteral('car', sanitizer.bypassSecurityTrustHtml(DIRECTIONS_CAR_ICON));
  }
}
