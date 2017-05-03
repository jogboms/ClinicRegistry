import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { StoreItemModel } from 'app/model/storeItem.model';
import { StoreActionModel } from 'app/model/storeAction.model';

// Action types and creators
@Injectable()
export class StoreActions {
  static SELECT = '[STORE] SELECT';
  select(id): Action {
    return { type: StoreActions.SELECT, payload: { id }};
  }

  static REMOVE = '[STORE] REMOVE';
  remove(item): Action {
    return { type: StoreActions.REMOVE, payload: item };
  }

  static REMOVE_SUCCESS = '[STORE] REMOVE SUCCESS';
  remove_success(item): Action {
    return { type: StoreActions.REMOVE_SUCCESS, payload: item };
  }

  static CREATE = '[STORE] CREATE';
  create(item: StoreItemModel): Action {
    return { type: StoreActions.CREATE, payload: item };
  }

  static CREATE_SUCCESS = '[STORE] CREATE SUCCESS';
  create_success(note): Action {
    return { type: StoreActions.CREATE_SUCCESS, payload: note };
  }

  static CREATE_ACTION = '[STORE] CREATE ACTION';
  create_action(item: StoreActionModel): Action {
    return { type: StoreActions.CREATE_ACTION, payload: item };
  }

  static CREATE_ACTION_SUCCESS = '[STORE] CREATE ACTION SUCCESS';
  create_action_success(note): Action {
    return { type: StoreActions.CREATE_ACTION_SUCCESS, payload: note };
  }

  static INIT = '[STORE] INIT';
  init(): Action {
    return { type: StoreActions.INIT };
  }

  static INIT_SUCCESS = '[STORE] INIT SUCCESS';
  init_success(diary): Action {
    return { type: StoreActions.INIT_SUCCESS, payload: diary };
  }

  static INIT_ACTIONS = '[STORE] INIT ACTIONS';
  init_actions(): Action {
    return { type: StoreActions.INIT_ACTIONS };
  }

  static INIT_ACTIONS_SUCCESS = '[STORE] INIT ACTIONS SUCCESS';
  init_actions_success(actions): Action {
    return { type: StoreActions.INIT_ACTIONS_SUCCESS, payload: actions };
  }
}

