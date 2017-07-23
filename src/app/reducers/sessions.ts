import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { SessionModel } from 'app/model/session.model';
import { SessionsActions } from '../actions/sessions.action';
import { PatientActions } from '../actions/patient.action';

import { Action } from 'app/reducers';

export type SessionData = { [id: number]: SessionModel };
export interface SessionsState {
  selected: string;
  status: boolean;
  ids: number[];
  data: SessionData;
}

const initialState: SessionsState = {
  selected: '',
  status: false,
  ids: [],
  data: null
}


// Reducer
export function sessions(state: SessionsState = initialState, {type, payload}: Action): SessionsState {
  switch (type) {

    case PatientActions.REMOVE_SUCCESS: {
      const data = _.omitBy(state.data, p => p.patient_id == payload);
      const ids = _.values(data).map(data => data['id']);
      return Object.assign({}, state, { ids, data });
    }

    case SessionsActions.EDIT_SUCCESS:
    case SessionsActions.TOGGLE_SUCCESS: {
      return Object.assign({}, state, { data: Object.assign({}, state.data, { [payload.id]: payload })});
    }

    case SessionsActions.CREATE_SUCCESS: {
      const data = Object.assign({}, state.data, { [payload.id]: payload });
      const ids = [payload.id, ...state.ids];
      return Object.assign({}, { selected: payload.id, status: true, ids , data });
    }

    case SessionsActions.REMOVE_SUCCESS: {
      const ids = state.ids.filter(ids => ids !== payload.id);
      const data = _.omit(state.data, payload.id);
      return Object.assign({}, state, { ids, data });
    }

    case SessionsActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as SessionData;

      return Object.assign({}, state, { status: false, ids, data });
    }

    default: return state;
  }
};

// Selectors
export function getIds() {
  return (sessions$: Observable<SessionsState>) => sessions$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (sessions$: Observable<SessionsState>) => sessions$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getMonthData(month, year) {
  return (sessions$: Observable<SessionModel[]>) => sessions$
    .map((s: SessionModel[]) => s.filter(s => s.month == month && s.year == year))
}
export function getStatus() {
  return (sessions$: Observable<SessionsState>) => sessions$.map(t => t.status);
}
export function getSelectedId() {
  return (sessions$: Observable<SessionsState>) => sessions$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelected() {
  return (sessions$: Observable<SessionsState>) => sessions$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}
