import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import * as _ from 'lodash';

import { PaymentModel } from 'app/model/payment.model';
import { PaymentsActions } from '../actions/payments.action';
import { PatientActions } from '../actions/patient.action';

export type PaymentData = { [id: number]: PaymentModel };
export interface PaymentsState {
  selected: string;
  status: boolean;
  ids: string[];
  data: PaymentData;
}

const initialState: PaymentsState = {
  selected: '',
  status: false,
  ids: [],
  data: null
}

// Reducer
export function payments(state: PaymentsState = initialState, {type, payload}: Action): PaymentsState {
  switch (type) {

    case PatientActions.REMOVE_SUCCESS: {
      const data = _.omitBy(state.data, p => p.patient_id == payload) as PaymentData;
      const ids = _.values(data).map(data => data['id']);
      return { ...state, ids, data };
    }

    case PaymentsActions.EDIT_SUCCESS: {
      return { ...state, data: { ...state.data, [payload.id]: payload } };
    }

    case PaymentsActions.CREATE_SUCCESS: {
      const data = { ...state.data, [payload.id]: payload };
      const ids = [payload.id, ...state.ids];
      return { selected: payload.id, status: true, ids , data };
    }

    case PaymentsActions.REMOVE_SUCCESS: {
      const ids = state.ids.filter(ids => ids !== payload.id);
      const data = _.omit(state.data, payload.id) as PaymentData;
      return { ...state, ids, data };
    }

    case PaymentsActions.INIT_SUCCESS: {
      const ids = payload.map(data => data.id);
      const data = _.mapKeys(payload, 'id') as PaymentData;

      return { ...state, status: false, ids, data };
    }

    default: return state;
  }
};

// Selectors
export function getIds() {
  return (payments$: Observable<PaymentsState>) => payments$.map(t => t.ids).filter(ids => !!ids);
}
export function getData(ids) {
  return (payments$: Observable<PaymentsState>) => payments$
    .map(t => t.data)
    .filter(data => data !== null)
    .map(data => ids.map(id => data[id]));
}
export function getMonthData(month, year) {
  return (payments$: Observable<PaymentModel[]>) => payments$
    .map(p => p.filter(p => p.month == month && p.year == year));
}
export function getStatus() {
  return (payments$: Observable<PaymentsState>) => payments$.map(t => t.status);
}
export function getSelectedId() {
  return (payments$: Observable<PaymentsState>) => payments$.map(t => t.selected).filter(s => !!s.length);
}
export function getSelected() {
  return (payments$: Observable<PaymentsState>) => payments$.filter(s => !!s.ids.length).map(t => t.data[t.selected]);
}
