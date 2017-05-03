import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { AppointmentModel } from '../model/appointment.model';
import { AppointmentsActions } from '../actions/appointments.action';

export type AppointmentsState = AppointmentModel[];

const initialState = null;

// Reducer
export function appointments(state: AppointmentsState = initialState, {type, payload}: Action): AppointmentsState {
  switch (type) {
    case AppointmentsActions.FETCH_SUCCESS: {
      return payload;
    }

    default: return state;
  }
};
