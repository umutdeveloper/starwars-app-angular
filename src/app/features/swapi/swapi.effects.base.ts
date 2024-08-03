import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, delay, exhaustMap, filter, map, merge, of, take, withLatestFrom } from 'rxjs';
import { SwapiService } from './swapi.service';
import { SwapiActions } from './swapi.actions.base';
import { Store } from '@ngrx/store';
import type { FeatureName } from './swapi.state';

export const fetchListEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), swapiService = inject(SwapiService)) => {
      const pending$ = actions$.pipe(
        ofType(actions.fetchList),
        map(() => actions.fetchListPending())
      );
      return merge(
        pending$,
        actions$.pipe(
          ofType(actions.fetchList),
          exhaustMap(query =>
            swapiService.fetchList(apiPath, query).pipe(
              map(response => actions.fetchListFulfilled(response)),
              catchError((error: Error) => of(actions.fetchListRejected(error)))
            )
          )
        )
      );
    },
    { functional: true }
  );

export const fetchItemEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), swapiService = inject(SwapiService)) => {
      const pending$ = actions$.pipe(
        ofType(actions.fetchItem),
        map(() => actions.fetchItemPending())
      );
      return merge(
        pending$,
        actions$.pipe(
          ofType(actions.fetchItem),
          exhaustMap(({ id }) =>
            swapiService.fetchItem(apiPath, id).pipe(
              map(response => actions.fetchItemFulfilled(response)),
              catchError((error: Error) => of(actions.fetchItemRejected(error)))
            )
          )
        )
      );
    },
    { functional: true }
  );

export const fetchItemsEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), swapiService = inject(SwapiService)) => {
      const pending$ = actions$.pipe(
        ofType(actions.fetchItems),
        map(() => actions.fetchItemsPending())
      );
      return merge(
        pending$,
        actions$.pipe(
          ofType(actions.fetchItems),
          delay(1), // Wait to complete exhaust map.
          exhaustMap(({ ids }) =>
            swapiService.fetchItems(apiPath, ids).pipe(
              map(response => actions.fetchItemsFulfilled(response)),
              catchError((error: Error) => of(actions.fetchItemsRejected(error)))
            )
          )
        )
      );
    },
    { functional: true }
  );

export const requestItemsEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
      const fulfilledAction$ = actions$.pipe(ofType(actions.fetchItemsFulfilled));
      const requestItemAction$ = actions$.pipe(ofType(actions.requestItem));
      const requestedList$ = store.select(state => state.swapi[apiPath as FeatureName].requestedList);
      const itemStatus$ = store.select(state => state.swapi[apiPath as FeatureName].itemStatus);
      const canRequestItems$ = combineLatest([itemStatus$, requestedList$]).pipe(
        map(([status, list]) => {
          return status !== 'loading' && list.length > 0;
        })
      );
      return merge(fulfilledAction$, requestItemAction$).pipe(
        withLatestFrom(canRequestItems$),
        filter(([_, canRequestItems]) => canRequestItems),
        exhaustMap(() =>
          requestedList$.pipe(
            take(1),
            map(list => actions.fetchItems(list.slice(0, 5)))
          )
        )
      );
    },
    { functional: true }
  );
