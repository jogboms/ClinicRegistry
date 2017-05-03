import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class BackupActions {
  static INIT = '[BACKUP] INIT';
  init(payload): Action {
    return { type: BackupActions.INIT, payload };
  }

  static FETCH = '[BACKUP] FETCH';
  fetch(id): Action {
    return { type: BackupActions.FETCH, payload: id };
  }

  static SAVE = '[BACKUP] SAVE';
  save(): Action {
    return { type: BackupActions.SAVE };
  }
}

