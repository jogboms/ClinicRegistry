import { Injectable } from '@angular/core';
import { Action } from 'app/reducers';

// Action types and creators
@Injectable()
export class PaymentsActions {
  static INIT = '[PAYMENTS] INIT';
  init(payload = null): Action {
    return { type: PaymentsActions.INIT, payload };
  }

  static INIT_SUCCESS = '[PAYMENTS] INIT SUCCESS';
  init_success(payments): Action {
    return { type: PaymentsActions.INIT_SUCCESS, payload: payments };
  }

  static CREATE = '[PAYMENTS] CREATE';
  create(payment): Action {
    return { type: PaymentsActions.CREATE, payload: payment };
  }

  static CREATE_SUCCESS = '[PAYMENTS] CREATE SUCCESS';
  create_success(payment): Action {
    return { type: PaymentsActions.CREATE_SUCCESS, payload: payment };
  }

  static EDIT = '[PAYMENTS] EDIT';
  edit(payment): Action {
    return { type: PaymentsActions.EDIT, payload: payment };
  }

  static EDIT_SUCCESS = '[PAYMENTS] EDIT SUCCESS';
  edit_success(payment): Action {
    return { type: PaymentsActions.EDIT_SUCCESS, payload: payment };
  }

  static REMOVE = '[PAYMENTS] REMOVE';
  remove(payment): Action {
    return { type: PaymentsActions.REMOVE, payload: payment };
  }

  static REMOVE_SUCCESS = '[PAYMENTS] REMOVE SUCCESS';
  remove_success(payment): Action {
    return { type: PaymentsActions.REMOVE_SUCCESS, payload: payment };
  }

}

