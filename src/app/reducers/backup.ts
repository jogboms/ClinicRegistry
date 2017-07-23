import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { PatientsState, PatientData } from './patients';
import { PatientModel } from 'app/model/patient.model';
import { BackupActions } from '../actions/backup.action';

import { Action } from 'app/reducers';

export interface BackupState {
  selected: string;
  ids: string[],
  data: PatientsState[];
}

const initialState: BackupState = {
  selected: '',
  ids: [],
  data: null
}

// Reducer
export function backup(state: BackupState = initialState, {type, payload}: Action) {
  switch (type) {
    case BackupActions.FETCH: {
      return Object.assign({}, state, { selected: payload });
    }

    case BackupActions.INIT: {
      return Object.assign({}, state, { data: payload });
    }

    default: return state;
  }
};

// Selectors
export function getSelected() {
  return (backup$: Observable<BackupState>) => backup$.map(t => t.data[t.selected]);
}
