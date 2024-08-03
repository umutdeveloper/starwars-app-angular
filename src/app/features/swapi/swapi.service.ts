import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { SwapiListJSONResponse } from './models/base';
import { environment } from '../../../environments/environment';
import { JSONResponse } from '../../models/types';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private readonly http: HttpClient) {}

  fetchList(apiPath: string, query: { page: number; search: string }): Observable<SwapiListJSONResponse> {
    return this.http.get<SwapiListJSONResponse>(
      `${environment.baseSwapiUrl}${apiPath}/?page=${query.page}&search=${query.search}`
    );
  }

  fetchItem(apiPath: string, id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${environment.baseSwapiUrl}${apiPath}/${id}`);
  }

  fetchItems(apiPath: string, ids: number[]): Observable<JSONResponse[]> {
    return zip(ids.map(id => this.fetchItem(apiPath, id)));
  }
}
