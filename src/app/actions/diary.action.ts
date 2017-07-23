import { Injectable } from '@angular/core';
import { Action } from 'app/reducers';

// Action types and creators
@Injectable()
export class DiaryActions {
  static SELECT = '[DIARY] SELECT';
  select(date: Date): Action {
    return { type: DiaryActions.SELECT, payload: { date }};
  }

  static CREATE = '[DIARY] CREATE';
  create(args : { content: string }): Action {
    return { type: DiaryActions.CREATE, payload: { content: args.content } };
  }

  static CREATE_SUCCESS = '[DIARY] CREATE SUCCESS';
  create_success(note): Action {
    return { type: DiaryActions.CREATE_SUCCESS, payload: note };
  }

  static INIT = '[DIARY] INIT';
  init(payload = null): Action {
    return { type: DiaryActions.INIT, payload };
  }

  static INIT_SUCCESS = '[DIARY] INIT SUCCESS';
  init_success(diary): Action {
    return { type: DiaryActions.INIT_SUCCESS, payload: diary };
  }
}

