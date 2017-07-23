import { Injectable } from '@angular/core';
import { Action } from 'app/reducers';

// Action types and creators
@Injectable()
export class FilterActions {
  static MONTH = '[FILTER] MONTH';
  month(month, year): Action {
    return { type: FilterActions.MONTH, payload: { month, year } };
  }
}
