import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class MessagesActions {
  static SELECT = '[MESSAGES] SELECT';
  select(date: Date): Action {
    return { type: MessagesActions.SELECT, payload: { date }};
  }

  static CREATE = '[MESSAGES] CREATE';
  create(args : { content: string }): Action {
    return { type: MessagesActions.CREATE, payload: { content: args.content } };
  }

  static CREATE_SUCCESS = '[MESSAGES] CREATE SUCCESS';
  create_success(note): Action {
    return { type: MessagesActions.CREATE_SUCCESS, payload: note };
  }

  static INIT = '[MESSAGES] INIT';
  init(payload = null): Action {
    return { type: MessagesActions.INIT, payload };
  }

  static INIT_SUCCESS = '[MESSAGES] INIT SUCCESS';
  init_success(diary): Action {
    return { type: MessagesActions.INIT_SUCCESS, payload: diary };
  }
}

