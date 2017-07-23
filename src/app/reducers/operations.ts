import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Action } from 'app/reducers';

const initialState = null;

// Reducer
export function operations(state: any = initialState, {type, payload}: Action) {
  return state;
};
