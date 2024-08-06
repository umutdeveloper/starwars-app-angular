import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Person } from '../../features/swapi/models/person';
import { CardBadgeComponent } from './card-badge/card-badge.component';
import { PersonCardActionsComponent } from './person-card-actions/person-card-actions.component';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    CardBadgeComponent,
    PersonCardActionsComponent,
  ],
  templateUrl: './person-card.component.html',
  styleUrls: ['../card/card.scss', './person-card.component.scss'],
})
export class PersonCardComponent {
  @Input() person!: Person;

  getPersonColor(name: string): string {
    const colors = ['#42A5F5', '#66BB6A', '#EF5350', '#FF7043'];
    const asciiValue = name.charCodeAt(0);
    const colorIndex = asciiValue % colors.length;
    return colors[colorIndex];
  }
}
