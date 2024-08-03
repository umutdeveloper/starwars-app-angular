import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Base, SwapiState } from './models/base';
import { APIStatus, JSONResponse } from '../../models/types';
import { createReducer, on, createFeature, createSelector } from '@ngrx/store';
import { mapToState } from './mappers/list.mapper';
import { createListPageActionsFor } from './swapi.actions.base';
import { fetchItemEffect, fetchItemsEffect, fetchListEffect, requestItemsEffect } from './swapi.effects.base';

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
    const newState = { ...state };
    newState[type] = status;
    if (err) {
      newState.error = err || 'Failed to fetch data';
    }
    return newState;
  };

const withErrorHandler = <T extends Base>(state: SwapiState<T>, actionHandler: () => SwapiState<T>) => {
  try {
    return actionHandler();
  } catch (err: unknown) {
    const newState = { ...state };
    if (err instanceof Error) {
      newState.error = `JSON Format Error: ${err.message}`;
    } else {
      newState.error = `Unexpected Error: ${err}`;
    }
    return newState;
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
      const newState = { ...state };
      if (state.hasNext && state.status !== 'loading') {
        newState.pagination = { ...state.pagination, page: state.pagination.page + 1 };
      }
      return newState;
    }),
    on(listActions.prevPage, state => {
      const newState = { ...state };
      if (state.hasPrev && state.status !== 'loading') {
        newState.pagination = { ...state.pagination, page: state.pagination.page - 1 };
      }
      return newState;
    }),
    on(listActions.search, (state, { search }) => {
      const newState = { ...state };
      if (state.status !== 'loading') {
        newState.pagination = { ...state.pagination, page: 1, search };
      }
      return newState;
    }),
    on(listActions.requestItem, (state, { id }) => {
      const newState = { ...state };
      if (!state.requestedList.includes(id) && !state.entities[id]) {
        newState.requestedList = [...state.requestedList, id];
      }
      return newState;
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
    on(listActions.fetchListPending, statusHandler<T>('status', 'loading')),
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
        const newState = { ...state };
        const { id, item } = resultMapper(response);
        newState.error = null;
        newState.itemStatus = 'succeeded';
        const index = newState.requestedList.indexOf(id);
        if (index !== -1) {
          newState.requestedList = newState.requestedList.filter(reqId => reqId !== id);
        }
        return { ...adapter.setOne(item, newState) };
      });
    }),
    on(listActions.fetchItemsFulfilled, (state, { response }) => {
      return withErrorHandler(state, () => {
        const newState = { ...state };
        const list = response;
        const items: T[] = [];
        list.forEach(itemResponse => {
          const { id, item } = resultMapper(itemResponse);
          items.push(item);
          const index = newState.requestedList.indexOf(id);
          if (index !== -1) {
            newState.requestedList = newState.requestedList.filter(reqId => reqId !== id);
          }
        });
        newState.error = null;
        newState.itemStatus = 'succeeded';
        return { ...adapter.setMany(items, newState) };
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

  return { reducer, actions: listActions };
};

export const createFeatureFor = <T extends Base>(
  apiPath: string,
  resultMapper: (result: JSONResponse) => { id: number; item: T }
) => {
  const adapter = createEntityAdapter<T>();
  const initialState: SwapiState<T> = createInitialStateFor(adapter);
  const { reducer, actions } = createReducerFor(initialState, apiPath, resultMapper, adapter);
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

  const effects = {
    [`swapi${apiPath}listEffect`]: fetchListEffect(actions, apiPath),
    [`swapi${apiPath}itemEffect`]: fetchItemEffect(actions, apiPath),
    [`swapi${apiPath}itemsEffect`]: fetchItemsEffect(actions, apiPath),
    [`swapi${apiPath}requestItemsEffect`]: requestItemsEffect(actions, apiPath),
  };
  return { feature, reducer, actions, effects };
};
