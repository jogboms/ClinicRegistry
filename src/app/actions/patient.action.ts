import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class PatientActions {

  static FETCH = '[PATIENT] FETCH';
  fetch(id): Action {
    return { type: PatientActions.FETCH, payload: id };
  }

  static SEEN = '[PATIENT] SEEN';
  seen(id): Action {
    return { type: PatientActions.SEEN, payload: id };
  }

  static FETCH_SUCCESS = '[PATIENT] FETCH SUCCESS';
  fetch_success(patient): Action {
    return { type: PatientActions.FETCH_SUCCESS, payload: patient };
  }

  static CREATE = '[PATIENT] ADD';
  create(patient): Action {
    return { type: PatientActions.CREATE, payload: patient };
  }

  static CREATE_SUCCESS = '[PATIENT] ADD SUCCESS';
  create_success(patient): Action {
    return { type: PatientActions.CREATE_SUCCESS, payload: patient };
  }

  static EDIT = '[PATIENT] EDIT';
  edit(patient) {
    return {type: PatientActions.EDIT, payload: patient}
  }

  static EDIT_SUCCESS = '[PATIENT] EDIT SUCCESS';
  edit_success(patient): Action {
    return { type: PatientActions.EDIT_SUCCESS, payload: patient };
  }

  static REMOVE = '[PATIENT] REMOVE';
  delete(id): Action {
    return { type: PatientActions.REMOVE, payload: id };
  }

  static REMOVE_SUCCESS = '[PATIENT] REMOVE SUCCESS';
  delete_success(id): Action {
    return { type: PatientActions.REMOVE_SUCCESS, payload: id };
  }
}

