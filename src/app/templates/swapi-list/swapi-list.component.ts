import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ErrorHandler, Input, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FeatureDetails } from '../../features/swapi/swapi.state';
import { Base } from '../../features/swapi/models/base';
import { createSelector, Store } from '@ngrx/store';
import { filter, map, Observable, shareReplay, take, tap } from 'rxjs';
import { rootSelector } from '../../features/swapi/swapi.reducer';

@Component({
  selector: 'app-swapi-list',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, SearchBoxComponent, PaginationComponent],
  templateUrl: './swapi-list.component.html',
  styleUrl: './swapi-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapiListComponent<T extends Base> implements OnInit {
  @Input() header: string = '';
  @Input() featureDetails?: FeatureDetails<T>;

  isPending$?: Observable<boolean>;
  isPendingForNoItems$?: Observable<boolean>;
  isNotFound$?: Observable<boolean>;
  totalPage$?: Observable<number>;
  pageResultsLength$?: Observable<number>;
  pageHeader$?: Observable<string>;
  pagination$?: Observable<{ page: number; search: string; pageSize: number }>;
  hasPrev$?: Observable<boolean | null>;
  hasNext$?: Observable<boolean | null>;

  handleSearchQueryChange(text: string) {
    if (this.featureDetails) {
      this.store.dispatch(this.featureDetails.actions.search(text));
    }
  }

  goPreviousPage() {
    if (this.featureDetails) {
      this.store.dispatch(this.featureDetails.actions.prevPage());
    }
  }

  goNextPage() {
    if (this.featureDetails) {
      this.store.dispatch(this.featureDetails.actions.nextPage());
    }
  }

  ngOnInit(): void {
    if (this.featureDetails) {
      this.store.dispatch(this.featureDetails.actions.reset());
      this.setupSelectors();
    }
  }

  private setupSelectors() {
    if (this.featureDetails) {
      const selectStatus = createSelector(rootSelector, this.featureDetails.feature.selectStatus);
      const selectPageResults = createSelector(rootSelector, this.featureDetails.feature.selectPageResults);
      const selectIsPending = createSelector(selectStatus, status => status === 'loading');
      const selectIsPendingForNoItems = createSelector(selectPageResults, selectIsPending, (pageResults, isPending) => {
        return !pageResults.length && isPending;
      });
      const selectIsNotFound = createSelector(
        selectPageResults,
        selectIsPending,
        selectStatus,
        (pageResults, isPending, status) => !pageResults.length && !isPending && status !== 'idle'
      );
      const selectPagination = createSelector(rootSelector, rootSelector, this.featureDetails.feature.selectPagination);
      const selectCount = createSelector(rootSelector, rootSelector, this.featureDetails.feature.selectCount);
      const selectTotalPage = createSelector(selectPagination, selectCount, (pagination, count) => {
        return count % pagination.pageSize === 0
          ? count / pagination.pageSize
          : Math.floor(count / pagination.pageSize) + 1;
      });
      const selectHasPrev = createSelector(rootSelector, this.featureDetails.feature.selectHasPrev);
      const selectHasNext = createSelector(rootSelector, this.featureDetails.feature.selectHasNext);
      const selectError = createSelector(rootSelector, this.featureDetails.feature.selectError);
      this.isPending$ = this.store.select(selectIsPending);
      this.isPendingForNoItems$ = this.store.select(selectIsPendingForNoItems);
      this.isNotFound$ = this.store.select(selectIsNotFound);
      this.totalPage$ = this.store.select(selectTotalPage);
      this.pagination$ = this.store.select(selectPagination).pipe(
        tap(pagination => {
          if (this.featureDetails) {
            this.store.dispatch(this.featureDetails.actions.fetchList(pagination));
          }
          window.scrollTo(0, 0);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
      this.pageResultsLength$ = this.store.select(selectPageResults).pipe(map(results => results.length));
      this.pageHeader$ = this.store.select(selectCount).pipe(
        map(count => {
          return `${this.header} List (${count} ${count > 1 ? 'items' : 'item'})`;
        })
      );
      this.hasPrev$ = this.store.select(selectHasPrev);
      this.hasNext$ = this.store.select(selectHasNext);
      this.store
        .select(selectError)
        .pipe(
          filter(error => error !== null),
          take(1)
        )
        .subscribe(err => this.errorHandler.handleError(new Error(err)));
    }
  }

  constructor(private store: Store, private errorHandler: ErrorHandler) {}
}
