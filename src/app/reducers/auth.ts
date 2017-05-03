import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { AuthActions } from '../actions/auth.action';

export interface AuthCreationState {
  create_key_error: boolean;
  create_max_limit: boolean;
  create_error: boolean;
  create_success: boolean;
}

export interface AuthState {
  logged: boolean;
  admin: boolean;
  create: AuthCreationState;
}

const initialState: AuthState = {
  logged: false,
  admin: false,
  create: {
    create_key_error: false,
    create_max_limit: false,
    create_error: false,
    create_success: false,
  }
}

export function auth(state = initialState, {type, payload}: Action): AuthState {
  switch (type) {
    case AuthActions.INIT:
    case AuthActions.LOGIN_COMPLETE: {
      return Object.assign({}, state, { logged: payload.logged, admin: payload.admin });
    }

    case AuthActions.EDIT_COMPLETE: {
      if(payload == 1){
        return Object.assign({}, state, payload);
      }
      else {
        alert('The username is already taken.');
        return state;
      }
    }

    case AuthActions.CREATE_COMPLETE: {
      const create = Object.assign({}, state.create);

      if(payload == -1){
        create.create_key_error = true;
      }
      else if(payload == -2){
        create.create_max_limit = true;
      }
      else{
        create.create_error = !(create.create_success = !!payload);
      }

      return Object.assign({}, state, { create });
      // return Object.assign({}, state, { create: create });
    }

    case AuthActions.LOGOUT_COMPLETE: {
      return Object.assign({}, state, { logged: false, admin: false });
    }

    default: return state;
  }
}
