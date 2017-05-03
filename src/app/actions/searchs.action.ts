import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class SearchsActions {

  static SEARCH = '[SEARCH] SEARCH';
  static BY_ID = '[SEARCH] BY ID';
  static BY_KEY = '[SEARCH] BY KEY';
  search(search: {type: string, value: string}): Action {
    if(search.type == 'id') {
      return { type: SearchsActions.BY_ID, payload: search.value };
    }

    return { type: SearchsActions.BY_KEY, payload: search.value };
  }

  static CANCEL = '[SEARCH] CANCEL';
  cancel(): Action {
    return { type: SearchsActions.CANCEL, payload: null };
  }

  static PATIENTS_SUCCESS = '[SEARCH] PATIENTS SUCCESS';
  patients_success(patients): Action {
    return { type: SearchsActions.PATIENTS_SUCCESS, payload: patients };
  }
}

