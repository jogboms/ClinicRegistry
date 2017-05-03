import { Action } from '@ngrx/store';

export function logger(reducer) {
  return (state, action: Action) => {
    console.debug(action.type);
    const r = reducer(state, action);
    return r;
  };
}
