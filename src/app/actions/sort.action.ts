import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

// Action types and creators
@Injectable()
export class SortActions {

  static ALPHA_ASC = '[SORT] ALPHA ASC';
  alpha_asc(): Action {
    return { type: SortActions.ALPHA_ASC, payload: null };
  }

  static DATE_ASC = '[SORT] DATE ASC';
  date_asc(): Action {
    return { type: SortActions.DATE_ASC, payload: null };
  }

  static UPDATED_ASC = '[SORT] UPDATED ASC';
  updated_asc(): Action {
    return { type: SortActions.UPDATED_ASC, payload: null };
  }

  static ALPHA_DESC = '[SORT] ALPHA DESC';
  alpha_desc(): Action {
    return { type: SortActions.ALPHA_DESC, payload: null };
  }

  static DATE_DESC = '[SORT] DATE DESC';
  date_desc(): Action {
    return { type: SortActions.DATE_DESC, payload: null };
  }

  static UPDATED_DESC = '[SORT] UPDATED DESC';
  updated_desc(): Action {
    return { type: SortActions.UPDATED_DESC, payload: null };
  }

  static ALPHA_CANCEL = '[SORT] ALPHA CANCEL';
  alpha_cancel(): Action {
    return { type: SortActions.ALPHA_CANCEL, payload: null };
  }

  static DATE_CANCEL = '[SORT] DATE CANCEL';
  date_cancel(): Action {
    return { type: SortActions.DATE_CANCEL, payload: null };
  }

  static UPDATED_CANCEL = '[SORT] UPDATED CANCEL';
  updated_cancel(): Action {
    return { type: SortActions.UPDATED_CANCEL, payload: null };
  }

}
