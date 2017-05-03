import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class PatientsActions {
  static INIT = '[PATIENTS] INIT';
  init(payload = null): Action {
    return { type: PatientsActions.INIT, payload };
  }

  static INIT_SUCCESS = '[PATIENTS] INIT SUCCESS';
  init_success(patients): Action {
    return { type: PatientsActions.INIT_SUCCESS, payload: patients };
  }
}

