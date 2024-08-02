import { EntityState } from '@ngrx/entity';
import { APIStatus, JSONResponse } from '../../../models/types';

export interface SwapiListJSONResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<JSONResponse>;
}

export interface SwapiState<T extends Base> extends EntityState<T> {
  count: number;
  pagination: {
    page: number;
    search: string;
    pageSize: number;
  };
  hasNext: boolean | null;
  hasPrev: boolean | null;
  pageResults: Array<number>;
  requestedList: Array<number>;
  status: APIStatus;
  itemStatus: APIStatus;
  error: string | null;
}

export interface Base {
  id: number;
  created: string;
  edited: string;
}
