import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input() message: string = '';

  handleReload() {
    window.location.reload();
  }

  handleHome() {
    window.location.href = environment.baseHref;
  }

  constructor(private snackBar: MatSnackBar) {
    this.snackBar.open(this.message, 'Close', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
  }
}
