import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { PatientModel } from 'app/model/patient.model';
import { SearchsActions } from '../actions/searchs.action';
import { PatientsState } from './patients';

export interface SearchsState {
  searching: boolean;
  ids: number[];
  patients: PatientsState;
}

const initialState: SearchsState = {
  searching: false,
  ids: [],
  patients: null
};

// Reducer
export function searchs (state: SearchsState = initialState, {type, payload}: Action):SearchsState {
  switch (type) {
    case SearchsActions.PATIENTS_SUCCESS: {
      return { searching: true, patients: payload, ids: [] };
    }

    case SearchsActions.CANCEL: {
      return Object.assign({}, state, { searching: false });
    }

    default: return state;
  }
};
