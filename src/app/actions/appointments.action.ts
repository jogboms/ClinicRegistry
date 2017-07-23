import { Injectable } from '@angular/core';

import { Action } from 'app/reducers';

// Action types and creators
@Injectable()
export class AppointmentsActions {
  static FETCH = '[APPOINTMENTS] FETCH ';
  fetch(year): Action {
    return { type: AppointmentsActions.FETCH, payload: year };
  }

  static FETCH_SUCCESS = '[APPOINTMENTS] FETCH SUCCESS';
  fetch_success(appointments): Action {
    return { type: AppointmentsActions.FETCH_SUCCESS, payload: appointments };
  }
}

