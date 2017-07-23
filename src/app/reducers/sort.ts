import { SortActions } from '../actions/sort.action';
import { PatientModel } from 'app/model/patient.model';
import { Observable } from 'rxjs/Observable';

import { Action } from 'app/reducers';

export interface SortState {
  date: number;
  updated: number;
  alpha: number;
}

enum STATES {
  CANCEL = 0,
  ASC = 1,
  DESC = -1
}

const initialState: SortState = { date: STATES.CANCEL, alpha: STATES.CANCEL, updated: STATES.ASC };

// Reducer
export function sort<SortState>(state = initialState, {type, payload}: Action) {
  switch (type) {
    case SortActions.ALPHA_ASC: {
      return Object.assign({}, state, { alpha: STATES.ASC });
    }
    case SortActions.ALPHA_DESC: {
      return Object.assign({}, state, { alpha: STATES.DESC });
    }
    case SortActions.ALPHA_CANCEL: {
      return Object.assign({}, state, { alpha: STATES.CANCEL });
    }

    case SortActions.DATE_ASC: {
      return Object.assign({}, state, { date: STATES.ASC });
    }
    case SortActions.DATE_DESC: {
      return Object.assign({}, state, { date: STATES.DESC });
    }
    case SortActions.DATE_CANCEL: {
      return Object.assign({}, state, { date: STATES.CANCEL });
    }

    // Disable sorting by date when sorting by updated date too
    case SortActions.UPDATED_ASC: {
      return Object.assign({}, state, { date: STATES.CANCEL, updated: STATES.ASC });
    }
    case SortActions.UPDATED_DESC: {
      return Object.assign({}, state, { date: STATES.CANCEL, updated: STATES.DESC });
    }
    case SortActions.UPDATED_CANCEL: { // Revert back to sorting by date
      return Object.assign({}, state, { date: STATES.ASC, updated: STATES.CANCEL });
    }

    default: return state;
  }
};

// Selectors
export const getSort = () => (sort$: Observable<SortState>) => sort$.map(sort => (a, b) => {
    const test = (x, y) => x > y ? 1 : (x < y ? -1 : 0);

    // updated date
    const p = new Date(a.created);
    const c = new Date(b.created);
    // updated updated date
    const u = new Date(a.updated || null);
    const v = new Date(b.updated || null);

    var cond = STATES.CANCEL;

    // Alphabet
    if(sort.alpha == STATES.ASC) {
      cond = cond || test(a.surname, b.surname);
    }
    else if(sort.alpha == STATES.DESC) {
      cond = cond || test(b.surname, a.surname);
    }

    // Date
    if(sort.date == STATES.ASC) {
      cond = cond || test(c.getTime(), p.getTime());
    }
    else if(sort.date == STATES.DESC) {
      cond = test(p.getTime(), c.getTime());
    }

    // Updated Date
    if(sort.updated == STATES.ASC) {
      cond = cond || test(b.status, a.status);
      // cond = cond || test(v.getTime(), u.getTime());
    }
    else if(sort.updated == STATES.DESC) {
      cond = test(a.status, b.status);
      // cond = test(u.getTime(), v.getTime());
    }

    return cond;
  });
