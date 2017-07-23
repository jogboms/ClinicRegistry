import { Injectable } from '@angular/core';
import { Action } from 'app/reducers';

// Action types and creators
@Injectable()
export class SessionsActions {
  static INIT = '[SESSIONS] INIT';
  init(payload = null): Action {
    return { type: SessionsActions.INIT, payload };
  }

  static INIT_SUCCESS = '[SESSIONS] INIT SUCCESS';
  init_success(sessions): Action {
    return {  type: SessionsActions.INIT_SUCCESS, payload: sessions  };
  }

  static CREATE = '[SESSIONS] CREATE';
  create(session): Action {
    return { type: SessionsActions.CREATE, payload: session };
  }

  static CREATE_SUCCESS = '[SESSIONS] CREATE SUCCESS';
  create_success(session): Action {
    return { type: SessionsActions.CREATE_SUCCESS, payload: session };
  }

  static REMOVE = '[SESSIONS] REMOVE';
  remove(session): Action {
    return { type: SessionsActions.REMOVE, payload: session };
  }

  static REMOVE_SUCCESS = '[SESSIONS] REMOVE SUCCESS';
  remove_success(session): Action {
    return { type: SessionsActions.REMOVE_SUCCESS, payload: session };
  }

  static TOGGLE = '[SESSIONS] TOGGLE';
  toggle(session): Action {
    return { type: SessionsActions.TOGGLE, payload: session };
  }

  static TOGGLE_SUCCESS = '[SESSIONS] TOGGLE SUCCESS';
  toggle_success(session): Action {
    return { type: SessionsActions.TOGGLE_SUCCESS, payload: session };
  }

  static EDIT = '[SESSIONS] EDIT';
  edit(session): Action {
    return { type: SessionsActions.EDIT, payload: session };
  }

  static EDIT_SUCCESS = '[SESSIONS] EDIT SUCCESS';
  edit_success(session): Action {
    return { type: SessionsActions.EDIT_SUCCESS, payload: session };
  }

}

