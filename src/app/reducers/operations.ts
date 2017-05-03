import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

const initialState = null;

// Reducer
export function operations(state: any = initialState, {type, payload}: Action) {
  return state;
};
