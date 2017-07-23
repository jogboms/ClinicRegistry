import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { StoreActionModel } from 'app/model/storeAction.model';
import { StoreActions } from '../actions/store.action';

import { Action } from 'app/reducers';

export type StoreActionData = { [id: number]: StoreActionModel };
export interface StoreActionsState {
  selected: string;
  ids: number[];
  data: StoreActionData;
}

const initialState: StoreActionsState = {
  selected: '',
  ids: [],
  data: null,
}


// Reducer
export function storeActions(state: StoreActionsState = initialState, {type, payload}: Action): StoreActionsState {
  switch (type) {
    case StoreActions.CREATE_ACTION_SUCCESS: {
      const data = { ...state.data, [payload.id]: payload };
      const ids = [payload.id, ...state.ids];
      return { ...state, selected: payload.id, ids , data };
    }

    case StoreActions.INIT_ACTIONS_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as StoreActionData;

      return { ...state, ids, data };
    }

    default: return state;
  }
};

// Selectors
export function getIds() {
  return (store$: Observable<StoreActionsState>) => store$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (store$: Observable<StoreActionsState>) => store$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getSelectedId() {
  return (store$: Observable<StoreActionsState>) => store$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelected() {
  return (store$: Observable<StoreActionsState>) => store$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}
