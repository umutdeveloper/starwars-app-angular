import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Routes } from '../../utils/routes';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  constructor(private snackBar: MatSnackBar, private router: Router) {
    super();
  }

  override handleError(error: Error): void {
    const message = error.message ? error.message : 'Unexpected Error!';
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'start',
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });
    console.error(error);
    this.router.navigateByUrl(Routes.Error);
    super.handleError(error);
  }
}
