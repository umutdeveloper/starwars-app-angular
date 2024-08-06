import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, Subscription } from 'rxjs';
import CLEAR_SVG from '../../icons/clear';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnDestroy {
  @Input() disabled = false;
  @Output() onChange = new EventEmitter<string>();

  searchControl = new FormControl('');
  private searchControlSub: Subscription;

  clearField() {
    this.searchControl.setValue('');
  }

  ngOnDestroy(): void {
    this.searchControlSub.unsubscribe();
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('clear', sanitizer.bypassSecurityTrustHtml(CLEAR_SVG));
    this.searchControlSub = this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (!this.disabled) {
        this.onChange.emit(value || '');
      }
    });
  }
}
