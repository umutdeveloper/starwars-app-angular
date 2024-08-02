import { JSONResponse } from '../../../models/types';
import { getNumber, getArrayFor } from '../../../utils/types';
import { Base, SwapiListJSONResponse, SwapiState } from '../models/base';

export const mapToState = <T extends Base>(
  response: SwapiListJSONResponse,
  resultMapper: (result: JSONResponse) => { id: number; item: T }
) => {
  const state: Pick<SwapiState<T>, 'count' | 'hasNext' | 'hasPrev' | 'pageResults'> & { mappedResults: T[] } = {
    count: getNumber(response.count),
    hasNext: response.next !== null,
    hasPrev: response.previous !== null,
    ...getArrayFor<JSONResponse>(response.results).reduce(
      (acc: { mappedResults: T[]; pageResults: number[] }, curr) => {
        const { id, item } = resultMapper(curr);
        acc.mappedResults.push(item);
        acc.pageResults.push(id);
        return acc;
      },
      { mappedResults: [], pageResults: [] }
    ),
  };
  return state;
};
