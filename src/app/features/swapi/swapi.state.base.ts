import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Base, SwapiState } from './models/base';
import { APIStatus, JSONResponse } from '../../models/types';
import { createReducer, on, createFeature, createSelector } from '@ngrx/store';
import { mapToState } from './mappers/list.mapper';
import { createListPageActionsFor } from './swapi.actions.base';
import { fetchItemEffect, fetchItemsEffect, fetchListEffect } from './swapi.effects.base';

export const createInitialStateFor = <T extends Base>(adapter: EntityAdapter<T>) =>
  adapter.getInitialState({
    count: 0,
    pagination: {
      search: '',
      page: 1,
      pageSize: 10,
    },
    hasNext: false,
    hasPrev: false,
    pageResults: [],
    requestedList: [],
    status: 'idle',
    itemStatus: 'idle',
    error: null,
  } as Omit<SwapiState<T>, 'ids' | 'entities'>);

const statusHandler =
  <K extends Base>(type: 'status' | 'itemStatus', status: APIStatus, err?: string) =>
  (state: SwapiState<K>) => {
    state[type] = status;
    if (err) {
      state.error = err || 'Failed to fetch data';
    }
    return { ...state };
  };

const withErrorHandler = <T extends Base>(state: SwapiState<T>, actionHandler: () => SwapiState<T>) => {
  try {
    return actionHandler();
  } catch (err: unknown) {
    if (err instanceof Error) {
      state.error = `JSON Format Error: ${err.message}`;
    } else {
      state.error = `Unexpected Error: ${err}`;
    }
    return { ...state };
  }
};

const createReducerFor = <T extends Base>(
  initialState: SwapiState<T>,
  apiPath: string,
  resultMapper: (result: JSONResponse) => { id: number; item: T },
  adapter: EntityAdapter<T>
) => {
  const listActions = createListPageActionsFor(apiPath);
  const reducer = createReducer(
    initialState,
    on(listActions.nextPage, state => {
      if (state.hasNext && state.status !== 'loading') {
        state.pagination = { ...state.pagination, page: state.pagination.page + 1 };
      }
      return { ...state };
    }),
    on(listActions.prevPage, state => {
      if (state.hasPrev && state.status !== 'loading') {
        state.pagination = { ...state.pagination, page: state.pagination.page - 1 };
      }
      return { ...state };
    }),
    on(listActions.search, (state, { search }) => {
      if (state.status !== 'loading') {
        state.pagination = { ...state.pagination, page: 1, search };
      }
      return { ...state };
    }),
    on(listActions.requestItem, (state, { id }) => {
      if (!state.requestedList.includes(id) && !state.entities[id]) {
        state.requestedList.push(id);
      }
      return { ...state };
    }),
    on(listActions.reset, state => {
      return {
        ...state,
        error: null,
        count: initialState.count,
        pagination: { ...state.pagination, ...initialState.pagination },
        hasNext: initialState.hasNext,
        hasPrev: initialState.hasPrev,
        pageResults: initialState.pageResults,
        status: initialState.status,
      };
    }),
    on(listActions.clearRequestList, state => {
      return {
        ...state,
        requestedList: [],
        itemStatus: initialState.itemStatus,
      };
    }),
    on(listActions.fetchListPending, statusHandler('status', 'loading')),
    on(listActions.fetchItemPending, statusHandler('itemStatus', 'loading')),
    on(listActions.fetchItemsPending, statusHandler('itemStatus', 'loading')),
    on(listActions.fetchListFulfilled, (state, { response }) => {
      return withErrorHandler(state, () => {
        const { count, hasNext, hasPrev, pageResults, mappedResults } = mapToState(response, resultMapper);
        return {
          ...adapter.setMany(mappedResults, state),
          error: null,
          status: 'succeeded',
          count: count,
          hasNext: hasNext,
          hasPrev: hasPrev,
          pageResults: pageResults,
        };
      });
    }),
    on(listActions.fetchItemFulfilled, (state, { response }) => {
      return withErrorHandler(state, () => {
        const { id, item } = resultMapper(response);
        state.error = null;
        state.itemStatus = 'succeeded';
        const index = state.requestedList.indexOf(id);
        if (index !== -1) {
          state.requestedList.splice(index, 1);
        }
        return { ...adapter.setOne(item, state) };
      });
    }),
    on(listActions.fetchItemsFulfilled, (state, { response }) => {
      return withErrorHandler(state, () => {
        const list = response;
        const items: T[] = [];
        list.forEach(itemResponse => {
          const { id, item } = resultMapper(itemResponse);
          items.push(item);
          const index = state.requestedList.indexOf(id);
          if (index !== -1) {
            state.requestedList.splice(index, 1);
          }
        });
        state.error = null;
        state.itemStatus = 'succeeded';
        return { ...adapter.setMany(items, state) };
      });
    }),
    on(listActions.fetchListRejected, (state, { error }) => statusHandler<T>('status', 'failed', error.message)(state)),
    on(listActions.fetchItemRejected, (state, { error }) =>
      statusHandler<T>('itemStatus', 'failed', error.message)(state)
    ),
    on(listActions.fetchItemsRejected, (state, { error }) =>
      statusHandler<T>('itemStatus', 'failed', error.message)(state)
    )
  );

  const effects = {
    [`swapi${apiPath}listEffect`]: fetchListEffect(listActions, apiPath),
    [`swapi${apiPath}itemEffect`]: fetchItemEffect(listActions, apiPath),
    [`swapi${apiPath}itemsEffect`]: fetchItemsEffect(listActions, apiPath),
  };

  return { reducer, actions: listActions, effects };
};

export const createFeatureFor = <T extends Base>(
  apiPath: string,
  resultMapper: (result: JSONResponse) => { id: number; item: T }
) => {
  const adapter = createEntityAdapter<T>();
  const initialState: SwapiState<T> = createInitialStateFor(adapter);
  const { reducer, actions, effects } = createReducerFor(initialState, apiPath, resultMapper, adapter);
  const feature = createFeature({
    name: apiPath,
    reducer,
    extraSelectors: ({ selectEntities, selectPageResults }) => ({
      selectPageItemResults: createSelector(
        selectEntities,
        selectPageResults,
        (entities, pageResults) => pageResults.map(id => entities[id]) as T[]
      ),
    }),
  });
  return { feature, reducer, actions, effects };
};
