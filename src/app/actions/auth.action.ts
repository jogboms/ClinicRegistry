import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class AuthActions {
  static INIT = '[ADMIN] INIT';
  init(state): Action {
    return { type: AuthActions.INIT, payload: state }
  }

  static LOGIN = '[ADMIN] LOGIN';
  login(auth): Action {
    return { type: AuthActions.LOGIN, payload: auth }
  }

  static LOGOUT = '[ADMIN] LOGOUT';
  logout(): Action {
    return { type: AuthActions.LOGOUT, payload: null }
  }

  static CREATE = '[ADMIN] CREATE';
  create(auth): Action {
    return { type: AuthActions.CREATE, payload: auth }
  }

  static EDIT = '[ADMIN] EDIT';
  edit(auth): Action {
    return { type: AuthActions.EDIT, payload: auth }
  }

  static LOGIN_COMPLETE = '[ADMIN] LOGIN COMPLETE';
  login_complete(state): Action {
    return { type: AuthActions.LOGIN_COMPLETE, payload: state }
  }

  static LOGOUT_COMPLETE = '[ADMIN] LOGOUT COMPLETE';
  logout_complete(): Action {
    return { type: AuthActions.LOGOUT_COMPLETE, payload: null }
  }

  static CREATE_COMPLETE = '[ADMIN] CREATE COMPLETE';
  create_complete(auth): Action {
    return { type: AuthActions.CREATE_COMPLETE, payload: auth }
  }

  static EDIT_COMPLETE = '[ADMIN] EDIT COMPLETE';
  edit_complete(auth): Action {
    return { type: AuthActions.EDIT_COMPLETE, payload: auth }
  }

}

