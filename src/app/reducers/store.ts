import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import * as _ from 'lodash';

import { StoreItemModel } from 'app/model/storeItem.model';
import { StoreActionModel } from 'app/model/storeAction.model';
import { StoreActions } from '../actions/store.action';

export type StoreData = { [id: number]: StoreItemModel };
export interface StoreState {
  selected: string;
  ids: number[];
  data: StoreData;
}

const initialState: StoreState = {
  selected: '',
  ids: [],
  data: null,
}


// Reducer
export function store(state: StoreState = initialState, {type, payload}: Action): StoreState {
  switch (type) {
    case StoreActions.SELECT: {
      return { ...state, selected: payload.id };
    }

    case StoreActions.REMOVE_SUCCESS: {
      const ids = state.ids.filter(ids => ids !== payload.id);
      const data = _.omit(state.data, payload.id);
      return Object.assign({}, state, { ids, data });
    }

    case StoreActions.CREATE_SUCCESS: {
      const data = { ...state.data, [payload.id]: payload };
      const ids = [payload.id, ...state.ids];
      return { ...state, selected: payload.id, ids , data };
    }

    case StoreActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as StoreData;

      return { ...state, ids, data };
    }

    default: return state;
  }
};

// Selectors
export function getIds() {
  return (store$: Observable<StoreState>) => store$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (store$: Observable<StoreState>) => store$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getSelectedId() {
  return (store$: Observable<StoreState>) => store$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelected() {
  return (store$: Observable<StoreState>) => store$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}
