import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { SwapiService } from './swapi.service';
import { SwapiActions } from './swapi.actions.base';

export const fetchListEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), swapiService = inject(SwapiService)) => {
      return actions$.pipe(
        ofType(actions.fetchList),
        tap(() => actions.fetchListPending()),
        exhaustMap(query =>
          swapiService.fetchList(apiPath, query).pipe(
            map(response => actions.fetchListFulfilled(response)),
            catchError((error: Error) => of(actions.fetchListRejected(error)))
          )
        )
      );
    },
    { functional: true }
  );

export const fetchItemEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), swapiService = inject(SwapiService)) => {
      return actions$.pipe(
        ofType(actions.fetchItem),
        tap(() => actions.fetchItemPending()),
        exhaustMap(({ id }) =>
          swapiService.fetchItem(apiPath, id).pipe(
            map(response => actions.fetchItemFulfilled(response)),
            catchError((error: Error) => of(actions.fetchItemRejected(error)))
          )
        )
      );
    },
    { functional: true }
  );

export const fetchItemsEffect = (actions: SwapiActions, apiPath: string) =>
  createEffect(
    (actions$ = inject(Actions), swapiService = inject(SwapiService)) => {
      return actions$.pipe(
        ofType(actions.fetchItems),
        tap(() => actions.fetchItemsPending()),
        exhaustMap(({ ids }) =>
          swapiService.fetchItems(apiPath, ids).pipe(
            map(response => actions.fetchItemsFulfilled(response)),
            catchError((error: Error) => of(actions.fetchItemsRejected(error)))
          )
        )
      );
    },
    { functional: true }
  );
