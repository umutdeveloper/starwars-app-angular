import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { JSONResponse } from '../../models/types';
import { SwapiListJSONResponse } from './models/base';

export const createListPageActionsFor = (apiPath: string) => {
  const asLiteral = <T extends string>(value: T): T => value;
  return createActionGroup({
    source: asLiteral(`${apiPath} List Page`),
    events: {
      nextPage: emptyProps(),
      prevPage: emptyProps(),
      search: (search: string) => ({ search }),
      requestItem: (id: number) => ({ id }),
      reset: emptyProps(),
      clearRequestList: emptyProps(),
      fetchList: props<{ page: number; search: string }>(),
      fetchListPending: emptyProps(),
      fetchListRejected: (error: Error) => ({ error }),
      fetchListFulfilled: (response: SwapiListJSONResponse) => ({ response }),
      fetchItem: (id: number) => ({ id }),
      fetchItemPending: emptyProps(),
      fetchItemRejected: (error: Error) => ({ error }),
      fetchItemFulfilled: (response: JSONResponse) => ({ response }),
      fetchItems: (ids: number[]) => ({ ids }),
      fetchItemsPending: emptyProps(),
      fetchItemsRejected: (error: Error) => ({ error }),
      fetchItemsFulfilled: (response: JSONResponse[]) => ({ response }),
    },
  });
};

export type SwapiActions = ReturnType<typeof createListPageActionsFor>;
