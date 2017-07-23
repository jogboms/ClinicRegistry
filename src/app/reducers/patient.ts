import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { PatientModel } from 'app/model/patient.model';
import { PaymentModel } from 'app/model/payment.model';
import { PatientActions } from '../actions/patient.action';
import { SessionsActions } from '../actions/sessions.action';

import { Action } from 'app/reducers';

export type PatientState = PatientModel;

const initialState: PatientState = null;


// Reducer
export function patient(state: PatientState = initialState, {type, payload}: Action): PatientState {
  switch (type) {
    case PatientActions.CREATE_SUCCESS: {
      return payload;
    }

    case PatientActions.EDIT_SUCCESS: {
      return Object.assign({}, state, payload);
    }

    default: return state;
  }
};

// Selectors
export function getPayments() {
  return (patients$: Observable<PatientState>) => patients$.map(state => state.payments);
}
export function getSessions() {
  return (patients$: Observable<PatientState>) => patients$.map(state => state.sessions);
}
