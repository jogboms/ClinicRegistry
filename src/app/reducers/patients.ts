import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { patient } from './patient';
import { PatientModel } from 'app/model/patient.model';
import { PatientActions } from '../actions/patient.action';
import { PatientsActions } from '../actions/patients.action';
import { SessionsActions } from '../actions/sessions.action';
import { PaymentsActions } from '../actions/payments.action';

import { Action } from 'app/reducers';

export type PatientData = { [id: number]: PatientModel };
export interface PatientsState {
  selected: string;
  status: boolean;
  ids: number[];
  data: PatientData;
}

const initialState: PatientsState = {
  selected: '',
  status: false,
  ids: [],
  data: null
}

function update_data(data, id, action) {
  return Object.assign({}, data, { [id]: patient(data[id], action) });
}

// Reducer
export function patients(state: PatientsState = initialState, {type, payload}: Action): PatientsState {
  switch (type) {
    case PatientActions.FETCH: {
      return Object.assign({}, state, { selected: payload });
    }

    case PatientActions.CREATE_SUCCESS: {
      const data = update_data(state.data, payload.id, { type, payload });
      const ids = [payload.id, ...state.ids];
      return Object.assign({}, { selected: payload.id, status: true, ids , data });
    }

    case PatientActions.EDIT_SUCCESS: {
      const data = update_data(state.data, payload.id, { type, payload });
      return Object.assign({}, state, { data });
    }

    case PatientActions.REMOVE_SUCCESS: {
      const ids = state.ids.filter(ids => ids !== payload);
      const data = _.omit(state.data, payload);
      return Object.assign({}, state, { ids, data });
    }

    case PatientsActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as PatientData;

      return Object.assign({}, state, { status: false, ids, data });
    }

    default: return state;
  }
};

// Selectors
export function getIds() {
  return (patients$: Observable<PatientsState>) => patients$.map(t => t.ids).filter(ids => !!ids);
}
export function getRawData() {
  return (patients$: Observable<PatientsState>) => patients$
    .map(t => t.data)
    .filter(data => data !== null)
}
export function getData(ids) {
  return (patients$: Observable<PatientsState>) => patients$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getStatus() {
  return (patients$: Observable<PatientsState>) => patients$.map(t => t.status);
}
export function getCosts(month = null, year = null) {
  const cost$ = (patients$: Observable<PatientModel[]>): Observable<number> => patients$
    .map(P => {
      if(month == null || year == null) return P;
      return P.filter(p => (p.x == month && p.y == year))
    })
    .map(P => P.reduce((a, c) => a + +c.cost, 0))
    .distinctUntilChanged()

  return cost$;
}
export function getSelectedId() {
  return (patients$: Observable<PatientsState>) => patients$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelected() {
  return (patients$: Observable<PatientsState>) => patients$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}
